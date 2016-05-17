/**
 * Renders the green tear-shaped handle under the cursor.
 */

const React = require('react');

const {
    cursorHandleRadiusPx,
    brightGreen,
    cursorHandleDistanceMultiplier,
} = require('../common-style');

const touchTargetRadiusPx = 22;
const touchTargetHeightPx = 2 * touchTargetRadiusPx;
const touchTargetWidthPx = 2 * touchTargetRadiusPx;

const cursorRadiusPx = cursorHandleRadiusPx;
const cursorHeightPx = cursorHandleDistanceMultiplier * cursorRadiusPx +
    cursorRadiusPx;
const cursorWidthPx = 2 * cursorRadiusPx;

const CursorHandle = React.createClass({
    propTypes: {
        animateIntoPosition: React.PropTypes.bool,
        onEnd: React.PropTypes.func.isRequired,
        onMove: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
    },

    getDefaultProps() {
        return {
            animateIntoPosition: false,
            visible: false,
            x: 0,
            y: 0,
        };
    },

    handleTouchMove(e) {
        e.preventDefault();

        const x = e.changedTouches[0].pageX;
        const y = e.changedTouches[0].pageY;

        this.props.onMove(x, y);
    },

    handleTouchEnd(e) {
        const x = e.changedTouches[0].pageX;
        const y = e.changedTouches[0].pageY;

        this.props.onEnd(x, y);
    },

    handleTouchCancel(e) {
        const x = e.changedTouches[0].pageX;
        const y = e.changedTouches[0].pageY;

        this.props.onEnd(x, y);
    },

    render() {
        const { x, y, animateIntoPosition } = this.props;

        const animationStyle = animateIntoPosition ? {
            transitionDuration: '100ms',
            transitionProperty: 'transform',
        } : { };

        const outerStyle = {
            position: 'absolute',
            zIndex: 1,
            left: -touchTargetWidthPx / 2,
            top: 0,
            transform: `translate(${x}px, ${y}px)`,
            width: touchTargetWidthPx,
            height: touchTargetHeightPx,
            ...animationStyle,
        };

        const innerStyle = {
            marginLeft: touchTargetRadiusPx - cursorRadiusPx,
        };

        return <span
            style={outerStyle}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            onTouchCancel={this.handleTouchCancel}
        >
            <svg
                width={cursorWidthPx}
                height={cursorHeightPx}
                viewBox={
                    `-${cursorRadiusPx} 0 ${cursorWidthPx} ${cursorHeightPx}`
                }
                style={innerStyle}
            >
                <path
                    d={
                        `M 0 0
                        L -${0.707 * cursorRadiusPx} ${0.707 * cursorRadiusPx}
                        A ${cursorRadiusPx} ${cursorRadiusPx}, 0, 1, 0,
                          ${0.707 * cursorRadiusPx} ${0.707 * cursorRadiusPx}
                        Z`
                    }
                    fill={brightGreen}
                />
            </svg>
        </span>;
    },
});

module.exports = CursorHandle;
