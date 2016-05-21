/**
 * A keypad component that acts as a container for rows or columns of buttons,
 * and manages the rendering of echo animations on top of those buttons.
 */

const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const EchoManager = require('./echo-manager');
const PopoverManager = require('./popover-manager');
const zIndexes = require('./input/z-indexes');
const { numeralGrey } = require('./common-style');
const { echoPropType, popoverPropType } = require('./prop-types');

const keypadBorderWidthPx = 1;

const animationDurationMs = 300;

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
        style: React.PropTypes.any,
    },

    componentDidMount() {
        window.addEventListener("resize", this._onResize);
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
            }, 2 * animationDurationMs);
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

    _onResize() {
        // Whenever the page resizes, we need to recompute the container's
        // bounding box. This is the only time that the bounding box can change.

        // Throttle resize events -- taken from:
        //    https://developer.mozilla.org/en-US/docs/Web/Events/resize
        if (this._resizeTimeout == null) {
            this._resizeTimeout = setTimeout(() => {
                this._resizeTimeout = null;

                // Recompute the bounding box.
                if (this.isMounted()) {
                    this._computeContainer();
                }
            }, 66);
        }
    },

    render() {
        const { children, echoes, popover, style } = this.props;

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
        const dynamicStyle = this.props.active
                           ? inlineStyles.active
                           : inlineStyles.hidden;

        return <View style={keypadStyle} dynamicStyle={dynamicStyle}>
            {children}
            <EchoManager echoes={relativeEchoes} />
            <PopoverManager popover={relativePopover} />
        </View>;
    },
});

const styles = StyleSheet.create({
    keypad: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: `${keypadBorderWidthPx}px solid rgba(0, 0, 0, 0.2)`,
        backgroundColor: numeralGrey,
        zIndex: zIndexes.keypad,
        transition: `${animationDurationMs}ms ease-out`,
    },
});

const inlineStyles = {
    hidden: {
        transform: 'translate3d(0, 100%, 0)',
    },

    active: {
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

module.exports = connect(mapStateToProps)(Keypad);
