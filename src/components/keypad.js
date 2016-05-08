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
const { lightGrey } = require('./common-style');
const { echoPropType } = require('./prop-types');

const keypadBorderWidthPx = 1;

const Keypad = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node,
        ]),
        echoes: React.PropTypes.arrayOf(echoPropType).isRequired,
        style: React.PropTypes.any,
    },

    componentWillMount() {
        // NOTE(charlie): We assume that there are no echoes in the initial
        // render, since we can't measure the container beforehand and thus any
        // echoes would be improperly offset.
        this._container = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };
    },

    componentWillReceiveProps(newProps) {
        // We cheat a bit and only re-measure the container if we're about to
        // kick off a new animation.
        const existingIds = this.props.echoes.map((echo) => echo.animationId);
        const newIds = newProps.echoes.map((echo) => echo.animationId);
        for (const newAnimationId of newIds) {
            if (!existingIds.includes(newAnimationId)) {
                const domNode = ReactDOM.findDOMNode(this);
                this._container = domNode.getBoundingClientRect();
                break;
            }
        }
    },

    render() {
        const { children, echoes, style } = this.props;

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

        const keypadStyle = [
            styles.keypad,
            ...(Array.isArray(style) ? style : [style]),
        ];

        return <View style={keypadStyle}>
            {children}
            <EchoManager echoes={relativeEchoes} />
        </View>;
    },
});

const styles = StyleSheet.create({
    keypad: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: `${keypadBorderWidthPx}px solid rgba(0, 0, 0, 0.2)`,
        backgroundColor: lightGrey,
    },
});

const mapStateToProps = (state) => {
    return state.echoes;
};

module.exports = connect(mapStateToProps)(Keypad);
