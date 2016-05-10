const React = require('react');
const ReactDOM = require('react-dom');
const { StyleSheet } = require("aphrodite");

const actions = require('../../actions');
const { View } = require('../../fake-react-native-web');
const CursorHandle = require('./cursor-handle');
const SelectionRect = require('./selection-rect');
const MathWrapper = require('./math-wrapper');

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

const MathInput = React.createClass({
    propTypes: {
        /**
         * A callback that's triggered whenever the cursor moves as a result of
         * a non-key press (i.e., through direct user interaction).
         *
         * The callback takes, as argument, a cursor object consisting of a
         * cursor context.
         */
        onCursorMove: React.PropTypes.func,
        onTouchStart: React.PropTypes.func,
    },

    getInitialState() {
        return {
            handle: {
                visible: false,
                x: 0,
                y: 0,
            },
            selectionRect: defaultSelectionRect,
        };
    },

    componentDidMount() {
        this.mathField = new MathWrapper(this._mathContainer, {
            onSelectionChanged: this.onSelectionChanged,
            onCursorMove: this.props.onCursorMove,
        });

        this._root = document.querySelector('.mq-root-block');
        this._root.style.border = `solid ${paddingWidthPx}px white`;
        this._root.style.fontSize = `${fontSizePt}pt`;

        // pass this component's handleKey method to the store so it can call
        // it whenever the store gets an KeyPress action from the keypad
        actions.registerKeyHandler(key => {
            const cursor = this.mathField.pressKey(key);

            // Hide the cursor handle whenever the user types a key.
            this.setState({ handle: { visible: false } });

            return cursor;
        });
    },

    onSelectionChanged(selection) {
        if (!selection) {
            this.setState({
                selectionRect: defaultSelectionRect,
            });
            return;
        }

        const selectionRoot = document.querySelector('.mq-selection');
        selectionRoot.setAttribute('id', 'selection-override');

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

        const selectionRect = {
            visible: true,
            x: bounds.left - mathContainerBounds.left - borderWidth - padding,
            y: bounds.top - mathContainerBounds.top - borderWidth - padding,
            width: bounds.right - bounds.left + 2 * padding,
            height: bounds.bottom - bounds.top + 2 * padding,
        };

        this.setState({ selectionRect });
    },

    _updateCursorHandle() {
        const containerBounds = this._container.getBoundingClientRect();
        const cursorBounds =
            document.querySelector('.mq-cursor').getBoundingClientRect();

        // Subtract the upper left corner of the container bounds from the
        // coordinates of the cursor to account for the fact that the
        // container is position:relative while the cursor handle will be
        // position:absolute.
        const left = cursorBounds.left - containerBounds.left;
        const bottom = cursorBounds.bottom - containerBounds.top;

        this.setState({
            handle: {
                visible: true,
                x: left,
                y: bottom,
            },
            selectionRect: defaultSelectionRect,
        });
    },

    /**
     * Set the position of the cursor and update the cursor handle if the
     * text field isn't empty.
     *
     * @param {number} x
     * @param {number} y
     */
    _setCursorLocation(x, y) {
        this.mathField.setCursorPosition(x, y);
        this.mathField.getCursor().show();

        if (this.mathField.getLatex() === "") {
            this.setState({
                handle: {
                    visible: false,
                    x: 0,
                    y: 0,
                },
            });
        } else {
            this._updateCursorHandle();
        }
    },

    handleTouchStart(e) {
        e.preventDefault();

        const touch = e.changedTouches[0];

        // If the user starts to grab the handle let the touchmove handler
        // handle positioning of the cursor.
        if (e.target !== this._cursorHandle) {
            this._setCursorLocation(touch.pageX, touch.pageY);
        }

        this.props.onTouchStart(e);
    },

    /**
     * Move the cursor beside the hitNode.  MathQuill uses the x, y coordinates
     * to decide which side of the hitNode the cursor should be on.
     *
     * @param {DOMNode} hitNode
     * @param {number} x
     * @param {number} y
     */
    _moveCursorToNode(hitNode, x, y) {
        this.mathField.setCursorPosition(x, y, hitNode);

        const cursorNode = document.querySelector('.mq-cursor');
        const cursorBounds = cursorNode.getBoundingClientRect();

        // Subtract the upper left corner of the container bounds from
        // the coordinates of the cursor to account for the fact that
        // the container is position:relative while the cursor handle
        // will be position:absolute.
        const containerBounds = this._container.getBoundingClientRect();
        const left = cursorBounds.left - containerBounds.left;
        const bottom = cursorBounds.bottom - containerBounds.top;

        this.setState({
            handle: {
                visible: true,
                x: left,
                y: bottom,
            },
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
     * @param {number} x  - initial x coordinate
     * @param {number} y  - initial y coordinate
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
                        !element.classList.contains('mq-root-block') &&
                        !element.classList.contains('mq-non-leaf'));

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
                this._moveCursorToNode(hitNode, x, y);
                return true;
            }
        }

        return false;
    },

    /**
     * When the user moves the cursor handle update the position of the cursor
     * and the handle.
     *
     * @param {number} x - pageX of a touchmove on the cursor handle
     * @param {number} y - pageY of a touchmove on the cursor handle
     */
    handleCursorHandleMove(x, y) {
        // TODO(kevinb) cache this in the touchstart of the CursorHandle
        const containerBounds = this._container.getBoundingClientRect();

        // Use a y-coordinate that's just above where the user is actually
        // touching because they're dragging the handle which is a little
        // below where the cursor actually is.
        const distanceAboveFingerToTrySelecting = 30;
        y = y - distanceAboveFingerToTrySelecting;

        if (y > containerBounds.bottom) {
            y = containerBounds.bottom;
        } else if (y < containerBounds.top) {
            y = containerBounds.top + 10;
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

        if (this._findHitNode(containerBounds, x, y, dx, dy)) {
            return;
        }

        // If we haven't found anything start from the top.
        y = containerBounds.top;

        // dy is positive b/c we're going downwards.
        dy = 8;

        if (this._findHitNode(containerBounds, x, y, dx, dy)) {
            return;
        }

        // We've exhausted all of the options.  In this situation the cursor
        // is probably to the right of the math so let's place it at the end
        // of the math expression.
        // TODO(kevinb) check if the cursor position is to the right of the
        // math before placing the cursor there.
        if (x > containerBounds.left) {
            // Position the cursor at the right end of the line.
            const cursor = this.mathField.getCursor();
            cursor.insAtRightEnd(this.mathField.mathField.__controller.root);

            this._updateCursorHandle();
        }
    },

    render() {
        const { handle, selectionRect } = this.state;

        return <View
            ref={(node) => this._container = ReactDOM.findDOMNode(node)}
            style={styles.input}
            onTouchStart={this.handleTouchStart}
        >
            <View
                ref={(node) => this._mathContainer = ReactDOM.findDOMNode(node)}
                style={styles.innerContainer}
            >
                {selectionRect.visible && <SelectionRect {...selectionRect}/>}
            </View>
            {handle.visible && <CursorHandle
                {...handle}
                ref={(node) => this._cursorHandle = ReactDOM.findDOMNode(node)}
                onMove={this.handleCursorHandleMove}
            />}
        </View>;
    },
});

const fontSizePt = 18;
const paddingWidthPx = 2;   // around _mathContainer and the selection rect
const borderWidthPx = 1;    // black border around _mathContainer

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
        position: 'relative',
    },

    // TODO(kevinb) update border style to match mocks
    innerContainer: {
        overflow: 'hidden',
        borderWidth: borderWidthPx,
        borderStyle: 'solid',
        borderColor: 'black',
    },
});

module.exports = MathInput;
