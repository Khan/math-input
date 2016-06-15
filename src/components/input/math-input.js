/* globals i18n */

const React = require('react');
const ReactDOM = require('react-dom');
const { StyleSheet } = require("aphrodite");

const { View } = require('../../fake-react-native-web');
const CursorHandle = require('./cursor-handle');
const SelectionRect = require('./selection-rect');
const MathWrapper = require('./math-wrapper');
const scrollIntoView = require('./scroll-into-view');
const {
    cursorHandleRadiusPx,
    cursorHandleDistanceMultiplier,
    mediumGrey,
 } = require('../common-style');
const { fractionBehavior } = require('../../settings');
const { FractionBehaviorTypes } = require('../../consts');
const { keypadElementPropType } = require('../prop-types');

const defaultSelectionRect = {
    visible: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

const unionRects = (rects) =>
    rects.reduce((previous, current) => {
        return {
            top: Math.min(previous.top, current.top),
            right: Math.max(previous.right, current.right),
            bottom: Math.max(previous.bottom, current.bottom),
            left: Math.min(previous.left, current.left),
        };
    }, {
        top: Infinity,
        right: -Infinity,
        bottom: -Infinity,
        left: Infinity,
    });

const constrainingFrictionFactor = 0.8;

const MathInput = React.createClass({
    propTypes: {
        // The behavior that the input should exhibit when the fraction key is
        // pressed. See the settings descriptors in `custom.html` for more.
        fractionBehavior: React.PropTypes.oneOf(
            Object.keys(FractionBehaviorTypes)
        ),
        // The React element node associated with the keypad that will send
        // key-press events to this input. If provided, this can be used to:
        //   (1) Avoid blurring the input, on user interaction with the keypad.
        //   (2) Scroll the input into view, if it would otherwise be obscured
        //       by the keypad on focus.
        keypadElement: keypadElementPropType,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired,
        onFocus: React.PropTypes.func,
        // Whether the input should be scrollable. This is typically only
        // necessary when a fixed width has been provided through the `style`
        // prop.
        scrollable: React.PropTypes.bool,
        // An extra, vanilla style object, to be applied to the math input.
        style: React.PropTypes.any,
        value: React.PropTypes.string,
    },

    getDefaultProps() {
        return {
            fractionBehavior,
            scrollable: false,
            style: {},
            value: "",
        };
    },

    getInitialState() {
        return {
            focused: false,
            handle: {
                animateIntoPosition: false,
                visible: false,
                x: 0,
                y: 0,
            },
            selectionRect: defaultSelectionRect,
        };
    },

    componentDidMount() {
        this.mathField = new MathWrapper(this._mathContainer, {
            fractionBehavior: this.props.fractionBehavior,
        }, {
            onCursorMove: (cursor) => {
                // TODO(charlie): It's not great that there is so much coupling
                // between this keypad and the input behavior. We should wrap
                // this `MathInput` component in an intermediary component
                // that translates accesses on the keypad into vanilla props,
                // to make this input keypad-agnostic.
                this.props.keypadElement &&
                    this.props.keypadElement.setCursor(cursor);
            },
        });

        // NOTE(charlie): MathQuill binds this handler to manage its
        // drag-to-select behavior. For reasons that I can't explain, the event
        // itself gets triggered even if you tap slightly outside of the
        // bound container (maybe 5px outside of any boundary). As a result, the
        // cursor appears when tapping at those locations, even though the input
        // itself doesn't receive any touch start or mouse down event and, as
        // such, doesn't focus itself. This makes for a confusing UX, as the
        // cursor appears, but the keypad does not and the input otherwise
        // treats itself as unfocused. Thankfully, we don't need this behavior--
        // we manage all of the cursor interactions ourselves--so we can safely
        // unbind the handler.
        this.mathField.mathField.__controller.container.unbind(
            'mousedown.mathquill'
        );

        // NOTE(charlie): MathQuill uses this method to do some layout in the
        // case that an input overflows its bounds and must become scrollable.
        // As it causes layout jank due to jQuery animations of scroll
        // properties, we disable it unless it is explicitly requested (as it
        // should be in the case of a fixed-width input).
        if (!this.props.scrollable) {
            this.mathField.mathField.__controller.scrollHoriz = function() {};
        }

        this.mathField.setContent(this.props.value);

        this._container = ReactDOM.findDOMNode(this);

        this._root = this._container.querySelector('.mq-root-block');
        this._root.style.border = `solid ${paddingWidthPx}px transparent`;
        this._root.style.fontSize = `${fontSizePt}pt`;

        // Record the initial scroll displacement on touch start. This allows
        // us to detect whether a touch event was a scroll and only blur the
        // input on non-scrolls--blurring the input on scroll makes for a
        // frustrating user experience.
        this.touchStartInitialScroll = null;
        this.recordTouchStartOutside = (evt) => {
            if (this.state.focused) {
                // Only blur if the touch is both outside of the input, and
                // outside of the keypad (if it has been provided).
                if (!this._container.contains(evt.target)) {
                    const maybeKeypadNode = this.props.keypadElement &&
                        ReactDOM.findDOMNode(this.props.keypadElement);
                    const touchStartInKeypad = maybeKeypadNode &&
                        maybeKeypadNode.contains(evt.target);

                    if (!touchStartInKeypad) {
                        this.didTouchOutside = true;
                        this.scrollListener = () => {
                            this.didScroll = true;
                        };
                        window.addEventListener('scroll', this.scrollListener);
                    }
                }
            }
        };

        this.blurOnTouchEndOutside = (evt) => {
            // If the user didn't scroll, blur the input.
            if (this.state.focused && this.didTouchOutside && !this.didScroll) {
                this.blur();
            }

            this.didTouchOutside = false;
            this.didScroll = false;
            window.removeEventListener('scroll', this.scrollListener);
        };

        window.addEventListener('touchstart', this.recordTouchStartOutside);
        window.addEventListener('touchend', this.blurOnTouchEndOutside);
        window.addEventListener('touchcancel', this.blurOnTouchEndOutside);
    },

    componentDidUpdate() {
        if (this.mathField.getContent() !== this.props.value) {
            this.mathField.setContent(this.props.value);
        }
    },

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.recordTouchStartOutside);
        window.removeEventListener('touchend', this.blurOnTouchEndOutside);
        window.removeEventListener('touchcancel', this.blurOnTouchEndOutside);
    },

    rectForSelection(selection) {
        if (!selection) {
            return defaultSelectionRect;
        }

        const selectionRoot = this._container.querySelector('.mq-selection');
        const bounds = unionRects(
            // Grab all the DOMNodes within the selection and calculate the
            // union of all of their bounding boxes.
            [...selectionRoot.querySelectorAll('*')].map(
                elem => elem.getBoundingClientRect()
            )
        );

        const mathContainerBounds =
            this._mathContainer.getBoundingClientRect();

        const borderWidth = borderWidthPx;
        const padding = paddingWidthPx;

        return {
            visible: true,
            x: bounds.left - mathContainerBounds.left - borderWidth - padding,
            y: bounds.top - mathContainerBounds.top - borderWidth - padding,
            width: bounds.right - bounds.left + 2 * padding,
            height: bounds.bottom - bounds.top + 2 * padding,
        };
    },

    _updateCursorHandle(animateIntoPosition) {
        const containerBounds = this._container.getBoundingClientRect();
        const cursor = this._container.querySelector('.mq-cursor');
        const cursorBounds = cursor.getBoundingClientRect();

        const cursorWidth = 2;
        const gapBelowCursor = 2;

        this.setState({
            handle: {
                visible: true,
                animateIntoPosition,
                // We subtract containerBounds' left/top to correct for the
                // position of the container within the page.
                x: cursorBounds.left + cursorWidth / 2 - containerBounds.left,
                y: cursorBounds.bottom + gapBelowCursor - containerBounds.top,
            },
            selectionRect: defaultSelectionRect,
        });
    },

    _hideCursorHandle() {
        this.setState({
            handle: {
                visible: false,
                x: 0,
                y: 0,
            },
        });
    },

    blur() {
        this.mathField.blur();
        this.props.onBlur && this.props.onBlur();
        this.setState({ focused: false, handle: { visible: false } });
    },

    focus() {
        // Pass this component's handleKey method to the keypad so it can call
        // it whenever it needs to trigger a keypress action.
        this.props.keypadElement.setKeyHandler(key => {
            const cursor = this.mathField.pressKey(key);

            // Trigger an `onChange` if the value in the input changed, and hide
            // the cursor handle and update the selection rect whenever the user
            // types a key. If the value changed as a result of a keypress, we
            // need to be careful not to call `setState` until after `onChange`
            // has resolved.
            const hideCursorAndUpdateSelectionRect = () => {
                this.setState({
                    handle: {
                        visible: false,
                    },
                    selectionRect: this.rectForSelection(cursor.selection),
                });
            };
            const value = this.mathField.getContent();
            if (this.props.value !== value) {
                this.props.onChange(value, hideCursorAndUpdateSelectionRect);
            } else {
                hideCursorAndUpdateSelectionRect();
            }

            return cursor;
        });

        this.mathField.focus();
        this.props.onFocus && this.props.onFocus();
        this.setState({ focused: true }, () => {
            // NOTE(charlie): We use `setTimeout` to allow for a layout pass to
            // occur. Otherwise, the keypad is measured incorrectly. Ideally,
            // we'd use requestAnimationFrame here, but it's unsupported on
            // Android Browser 4.3.
            setTimeout(() => {
                if (this.isMounted()) {
                    const maybeKeypadNode = this.props.keypadElement &&
                        ReactDOM.findDOMNode(this.props.keypadElement);
                    scrollIntoView(this._container, maybeKeypadNode);
                }
            });
        });
    },

    /**
     * Tries to determine which DOM node to place the cursor next to based on
     * where the user drags the cursor handle.  If it finds a node it will
     * place the cursor next to it, update the handle to be under the cursor,
     * and return true.  If it doesn't find a node, it returns false.
     *
     * It searches for nodes by doing it tests at the following points:
     *
     *   (x - dx, y), (x, y), (x + dx, y)
     *
     * If it doesn't find any nodes from the rendered math it will update y
     * by adding dy.
     *
     * The algorithm ends its search when y goes outside the bounds of
     * containerBounds.
     *
     * @param {ClientRect} containerBounds - bounds of the container node
     * @param {number} x - the initial x coordinate in the viewport
     * @param {number} y - the initial y coordinate in the viewport
     * @param {number} dx - horizontal spacing between elementFromPoint calls
     * @param {number} dy - vertical spacing between elementFromPoint calls,
     *                      sign determines direction.
     * @returns {boolean} - true if a node was hit, false otherwise.
     */
    _findHitNode(containerBounds, x, y, dx, dy) {
        while (y >= containerBounds.top && y <= containerBounds.bottom) {
            y += dy;

            const points = [
                [x - dx, y],
                [x, y],
                [x + dx, y],
            ];

            const elements = points
                .map(point => document.elementFromPoint(...point))
                // We exclude the root container itself and any nodes marked
                // as non-leaf which are fractions, parens, and roots.  The
                // children of those nodes are included in the list because
                // those are the items we care about placing the cursor next
                // to.
                //
                // MathQuill's mq-non-leaf is not applied to all non-leaf nodes
                // so the naming is a bit confusing.  Although fractions are
                // included, neither mq-numerator nor mq-denominator nodes are
                // and neither are subscripts or superscripts.
                .filter(element => element && this._root.contains(element) &&
                        ((
                          !element.classList.contains('mq-root-block') &&
                          !element.classList.contains('mq-non-leaf')
                         ) ||
                         element.classList.contains('mq-empty') ||
                         element.classList.contains('mq-hasCursor')
                        ));

            let hitNode = null;

            // Contains only DOMNodes without child elements.  These should
            // contain some amount of text though.
            const leafElements = [];

            // Contains only DOMNodes with child elements.
            const nonLeafElements = [];

            let max = 0;
            const counts = {};
            const elementsById = {};

            for (const element of elements) {
                const id = element.getAttribute('mathquill-command-id');
                if (id != null) {
                    leafElements.push(element);

                    counts[id] = (counts[id] || 0) + 1;
                    elementsById[id] = element;
                } else {
                    nonLeafElements.push(element);
                }
            }

            // When determining which DOMNode to place the cursor beside, we
            // prefer leaf nodes.  Hitting a leaf node is a good sign that the
            // cursor is really close to some piece of math that has been
            // rendered because leaf nodes contain text.  Non-leaf nodes may
            // contain a lot of whitespace so the cursor may be further away
            // from actual text within the expression.
            //
            // Since we're doing three hit tests per loop it's possible that
            // we hit multiple leaf nodes at the same time.  In this case we
            // we prefer the DOMNode with the most hits.
            // TODO(kevinb) consider preferring nodes hit by [x, y].
            for (const [id, count] of Object.entries(counts)) {
                if (count > max) {
                    max = count;
                    hitNode = elementsById[id];
                }
            }

            // It's possible that two non-leaf nodes are right beside each
            // other.  We don't bother counting the number of hits for each,
            // b/c this seems like an unlikely situation.  Also, ignoring the
            // hit count in the situation should not have serious effects on
            // the overall accuracy of the algorithm.
            if (hitNode == null && nonLeafElements.length > 0) {
                hitNode = nonLeafElements[0];
            }

            if (hitNode !== null) {
                this.mathField.setCursorPosition(x, y, hitNode);
                return true;
            }
        }

        return false;
    },

    /**
     * Inserts the cursor at the DOM node closest to the given coordinates,
     * based on hit-tests conducted using #_findHitNode.
     *
     * @param {number} x - the x coordinate in the viewport
     * @param {number} y - the y coordinate in the viewport
     */
    _insertCursorAtClosestNode(x, y) {
        const cursor = this.mathField.getCursor();

        // Pre-emptively check if the input has any child nodes; if not, the
        // input is empty, so we throw the cursor at the start.
        if (!this._root.hasChildNodes()) {
            cursor.insAtLeftEnd(this.mathField.mathField.__controller.root);
            return;
        }

        if (y > this._containerBounds.bottom) {
            y = this._containerBounds.bottom;
        } else if (y < this._containerBounds.top) {
            y = this._containerBounds.top + 10;
        }

        let dx;
        let dy;

        // Vertical spacing between hit tests
        // dy is negative because we're moving upwards.
        dy = -8;

        // Horizontal spacing between hit tests
        // Note: This value depends on the font size.  If the gap is too small
        // we end up placing the cursor at the end of the expression when we
        // shouldn't.
        dx = 5;

        if (this._findHitNode(this._containerBounds, x, y, dx, dy)) {
            return;
        }

        // If we haven't found anything start from the top.
        y = this._containerBounds.top;

        // dy is positive b/c we're going downwards.
        dy = 8;

        if (this._findHitNode(this._containerBounds, x, y, dx, dy)) {
            return;
        }

        const firstChildBounds = this._root.firstChild.getBoundingClientRect();
        const lastChildBounds = this._root.lastChild.getBoundingClientRect();

        const left = firstChildBounds.left;
        const right = lastChildBounds.right;

        // We've exhausted all of the options. We're likely either to the right
        // or left of all of the math, so we place the cursor at the end to
        // which it's closest.
        if (Math.abs(x - right) < Math.abs(x - left)) {
            cursor.insAtRightEnd(this.mathField.mathField.__controller.root);
        } else {
            cursor.insAtLeftEnd(this.mathField.mathField.__controller.root);
        }
    },

    handleTouchStart(e) {
        e.preventDefault();

        // Hide the cursor handle on touch start, if the handle itself isn't
        // handling the touch event.
        this._hideCursorHandle();

        // Cache the container bounds, so as to avoid re-computing. If we don't
        // have any content, then it's not necessary, since the cursor can't be
        // moved anyway.
        if (this.mathField.getContent() !== "") {
            this._containerBounds = this._container.getBoundingClientRect();

            // Make the cursor visible and set the handle-less cursor's
            // location.
            this.mathField.getCursor().show();
            const touch = e.changedTouches[0];
            this._insertCursorAtClosestNode(touch.clientX, touch.clientY);
        }

        // Trigger a focus event, if we're not already focused.
        if (!this.state.focused) {
            this.focus();
        }
    },

    handleTouchMove(e) {
        // Update the handle-less cursor's location on move, if there's any
        // content in the box.
        if (this.mathField.getContent() !== "") {
            const touch = e.changedTouches[0];
            this._insertCursorAtClosestNode(touch.clientX, touch.clientY);
        }
    },

    handleTouchEnd(e) {
        // And on touch-end, reveal the cursor, unless the input is empty.
        if (this.mathField.getContent() !== "") {
            this._updateCursorHandle();
        }
    },

    /**
     * When a touch starts in the cursor handle, we track it so as to avoid
     * handling any touch events ourself.
     *
     * @param {TouchEvent} e - the raw touch event from the browser
     */
    onCursorHandleTouchStart(e) {
        // NOTE(charlie): The cursor handle is a child of this view, so whenever
        // it receives a touch event, that event would also typically be bubbled
        // up to our own handlers. However, we want the cursor to handle its own
        // touch events, and for this view to only handle touch events that
        // don't affect the cursor. As such, we `stopPropagation` on any touch
        // events that are being handled by the cursor, so as to avoid handling
        // them in our own touch handlers.
        e.stopPropagation();

        e.preventDefault();

        // Cache the container bounds, so as to avoid re-computing.
        this._containerBounds = this._container.getBoundingClientRect();
    },

    _constrainToBound(value, min, max, friction) {
        if (value < min) {
            return min + (value - min) * friction;
        } else if (value > max) {
            return max + (value - max) * friction;
        } else {
            return value;
        }
    },

    /**
     * When the user moves the cursor handle update the position of the cursor
     * and the handle.
     *
     * @param {TouchEvent} e - the raw touch event from the browser
     */
    onCursorHandleTouchMove(e) {
        e.stopPropagation();

        const x = e.changedTouches[0].clientX;
        const y = e.changedTouches[0].clientY;

        const relativeX = x - this._containerBounds.left;
        const relativeY =
            y - 2 * cursorHandleRadiusPx * cursorHandleDistanceMultiplier
                - this._containerBounds.top;

        // We subtract the containerBounds left/top to correct for the
        // MathInput's position on the page. On top of that, we subtract an
        // additional 2 x {height of the cursor} so that the bottom of the
        // cursor tracks the user's finger, to make it visible under their
        // touch.
        this.setState({
            handle: {
                animateIntoPosition: false,
                visible: true,
                // TODO(charlie): Use clientX and clientY to avoid the need for
                // scroll offsets. This likely also means that the cursor
                // detection doesn't work when scrolled, since we're not
                // offsetting those values.
                x: this._constrainToBound(
                    relativeX,
                    0,
                    this._containerBounds.width,
                    constrainingFrictionFactor
                ),
                y: this._constrainToBound(
                    relativeY,
                    0,
                    this._containerBounds.height,
                    constrainingFrictionFactor
                ),
            },
        });

        // Use a y-coordinate that's just above where the user is actually
        // touching because they're dragging the handle which is a little
        // below where the cursor actually is.
        const distanceAboveFingerToTrySelecting = 22;
        const adjustedY = y - distanceAboveFingerToTrySelecting;

        this._insertCursorAtClosestNode(x, adjustedY);
    },

    /**
     * When the user releases the cursor handle, animate it back into place.
     *
     * @param {TouchEvent} e - the raw touch event from the browser
     */
    onCursorHandleTouchEnd(e) {
        e.stopPropagation();

        this._updateCursorHandle(true);
    },

    /**
     * If the gesture is cancelled mid-drag, simply hide it.
     *
     * @param {TouchEvent} e - the raw touch event from the browser
     */
    onCursorHandleTouchCancel(e) {
        e.stopPropagation();

        this._updateCursorHandle(true);
    },

    render() {
        const { focused, handle, selectionRect } = this.state;
        const { style } = this.props;

        const innerStyle = {
            ...inlineStyles.innerContainer,
            ...style,
        };

        return <View
            style={styles.input}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            role={'textbox'}
            ariaLabel={i18n._('Math input box')}
        >
            {/* NOTE(charlie): This is used purely to namespace the styles in
                overrides.css. */}
            <div className='keypad-input'>
                {/* NOTE(charlie): This element must be styled with inline
                    styles rather than with Aphrodite classes, as MathQuill
                    modifies the class names on the DOM node. */}
                <div
                    ref={(node) => {
                        this._mathContainer = ReactDOM.findDOMNode(node);
                    }}
                    style={innerStyle}
                >
                    {focused && selectionRect.visible &&
                        <SelectionRect {...selectionRect}/>}
                </div>
            </div>
            {focused && handle.visible && <CursorHandle
                {...handle}
                onTouchStart={this.onCursorHandleTouchStart}
                onTouchMove={this.onCursorHandleTouchMove}
                onTouchEnd={this.onCursorHandleTouchEnd}
                onTouchCancel={this.onCursorHandleTouchCancel}
            />}
        </View>;
    },
});

const fontSizePt = 18;
const minSizePx = 34;
const paddingWidthPx = 2;   // around _mathContainer and the selection rect
const borderWidthPx = 1;    // black border around _mathContainer

const styles = StyleSheet.create({
    input: {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
    },
});

const inlineStyles = {
    // Styles for the inner, MathQuill-ified input element. It's important that
    // these are done with regular inline styles rather than Aphrodite classes
    // as MathQuill adds CSS class names to the element outside of the typical
    // React flow; assigning a class to the element can thus disrupt MathQuill
    // behavior. For example, if the client provided new styles to be applied
    // on focus and the styles here were applied with Aphrodite, then Aphrodite
    // would merge the provided styles with the base styles here, producing a
    // new CSS class name that we would apply to the element, clobbering any CSS
    // class names that MathQuill had applied itself.
    innerContainer: {
        backgroundColor: 'white',
        display: 'flex',
        minWidth: minSizePx,
        minHeight: minSizePx,
        position: 'relative',
        overflow: 'hidden',
        borderWidth: borderWidthPx,
        borderStyle: 'solid',
        borderColor: mediumGrey,
        borderRadius: 4,
    },
};

module.exports = MathInput;
