/**
 * A keypad component that acts as a container for rows or columns of buttons,
 * and manages the rendering of echo animations on top of those buttons.
 */

const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');
const { StyleSheet } = require('aphrodite');

const { removeEcho } = require('../actions');
const { View } = require('../fake-react-native-web');
const EchoManager = require('./echo-manager');
const PopoverManager = require('./popover-manager');
const zIndexes = require('./input/z-indexes');
const { numeralGrey } = require('./common-style');
const { echoPropType, popoverPropType } = require('./prop-types');

const keypadBorderWidthPx = 1;
const keypadAnimationDurationMs = 300;

const Keypad = React.createClass({
    propTypes: {
        // Whether the keypad is active, i.e., whether it should be rendered as
        // visible or invisible.
        active: React.PropTypes.bool,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node,
        ]),
        echoes: React.PropTypes.arrayOf(echoPropType).isRequired,
        popover: popoverPropType,
        removeEcho: React.PropTypes.func.isRequired,
        style: React.PropTypes.any,
    },

    getInitialState() {
        // Use (partially unsupported) viewport units until componentDidMount.
        // It's okay to use the viewport units since they'll be overridden as
        // soon as the JavaScript kicks in.
        return {
            viewportWidth: "100vw",
        };
    },

    componentDidMount() {
        window.addEventListener("resize", this._onResize);

        this._updateSizeAndPosition();
    },

    componentWillReceiveProps(newProps) {
        if (!this._container && !this.props.active && newProps.active) {
            // On first appearance, compute the bounds of the container, but be
            // sure to wait until the view has finished animating into place,
            // taking care not to creep into the end of the animation, lest we
            // introduce jank.
            setTimeout(() => {
                if (this.isMounted()) {
                    this._computeContainer();
                }
            }, 2 * keypadAnimationDurationMs);
        }

        // If the user was interacts with the keypad before the timer went off,
        // be sure to compute the container.
        if (!this._container && (newProps.popover || newProps.echoes.length)) {
            this._computeContainer();
        }
    },

    componentWillUnmount() {
        window.removeEventListener("resize", this._onResize);
    },

    _computeContainer() {
        const domNode = ReactDOM.findDOMNode(this);
        this._container = domNode.getBoundingClientRect();
    },

    _updateSizeAndPosition() {
        // We don't use viewport units because of compatibility reasons.
        this.setState({
            viewportWidth: window.innerWidth,
        }, () => {
            if (this.props.active) {
                // Recalculate the container after the keypad animates to the
                // new position and size.
                setTimeout(() => {
                    if (this.isMounted()) {
                        this._computeContainer();
                    }
                }, 2 * keypadAnimationDurationMs);
            }

            // Mark the container for recalculation next time the keypad
            // is opened.
            this._container = null;
        });
    },

    _onResize() {
        // Whenever the page resizes, we need to recompute the container's
        // bounding box. This is the only time that the bounding box can change.

        // Throttle resize events -- taken from:
        //    https://developer.mozilla.org/en-US/docs/Web/Events/resize
        if (this._resizeTimeout == null) {
            this._resizeTimeout = setTimeout(() => {
                this._resizeTimeout = null;

                if (this.isMounted()) {
                    this._updateSizeAndPosition();
                }
            }, 66);
        }
    },

    render() {
        const {
            children,
            echoes,
            removeEcho,
            popover,
            style,
        } = this.props;

        const {
            viewportWidth,
        } = this.state;

        // Translate the echo boxes, as they'll be positioned absolutely to
        // this relative container.
        const relativeEchoes = echoes.map((echo) => {
            const { initialBounds, ...rest } = echo;
            return {
                ...rest,
                initialBounds: {
                    top: initialBounds.top - this._container.top -
                        keypadBorderWidthPx,
                    right: initialBounds.right - this._container.left,
                    bottom: initialBounds.bottom - this._container.top -
                        keypadBorderWidthPx,
                    left: initialBounds.left - this._container.left,
                    width: initialBounds.width,
                    height: initialBounds.height,
                },
            };
        });

        // Translate the popover bounds from page-absolute to keypad-relative.
        // Note that we only need three bounds, since popovers are anchored to
        // the bottom left corners of the keys over which they appear.
        const relativePopover = popover && {
            ...popover,
            bounds: {
                bottom: this._container.height - (popover.bounds.bottom -
                    this._container.top) - keypadBorderWidthPx,
                left: popover.bounds.left - this._container.left,
                width: popover.bounds.width,
            },
        };

        const keypadStyle = [
            styles.keypad,
            ...(Array.isArray(style) ? style : [style]),
        ];

        // NOTE(charlie): We render the transforms as pure inline styles to
        // avoid an Aphrodite bug in mobile Safari.
        //   See: https://github.com/Khan/aphrodite/issues/68.
        const dynamicStyle = {
            ...(this.props.active ? inlineStyles.active : inlineStyles.hidden),
            width: viewportWidth,
            // TODO(charlie): This is being overridden by the `View` elements
            // own `maxWidth: 100%`, which is injected with Aphrodite and so has
            // an `!important` annotation.
            maxWidth: viewportWidth,
        };

        return <View style={keypadStyle} dynamicStyle={dynamicStyle}>
            {children}
            <EchoManager
                echoes={relativeEchoes}
                onAnimationFinish={removeEcho}
            />
            <PopoverManager popover={relativePopover} />
        </View>;
    },
});

const styles = StyleSheet.create({
    keypad: {
        bottom: 0,
        position: 'fixed',
        // TODO(charlie): We'd like to use `overflowX: 'hidden'` to avoid making
        // the second page of keys visible during page resizes. However, adding
        // `overflowX: 'hidden'` makes the keypad cutoff its content vertically,
        // even after adding `overflowY: 'visible'`. So, for example, the
        // popover menus get cutoff at the top of the keypad, as do the echo
        // animations. In addition, `overflowX: 'hidden'` was making the second
        // page of keys appear above the sidebar on focus in mobile Safari.
        // overflowX: 'hidden',
        borderTop: `${keypadBorderWidthPx}px solid rgba(0, 0, 0, 0.2)`,
        backgroundColor: numeralGrey,
        zIndex: zIndexes.keypad,
        transition: `${keypadAnimationDurationMs}ms ease-out`,
        transitionProperty: 'transform',
    },
});

// Note: these don't go through an autoprefixer/aphrodite.
const inlineStyles = {
    hidden: {
        msTransform: 'translate3d(0, 100%, 0)',
        WebkitTransform: 'translate3d(0, 100%, 0)',
        transform: 'translate3d(0, 100%, 0)',
    },

    active: {
        msTransform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
    },
};

const mapStateToProps = (state) => {
    return {
        ...state.echoes,
        active: state.keypad.active,
        popover: state.gestures.popover,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeEcho: (animationId) => {
            dispatch(removeEcho(animationId));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Keypad);
