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
        onTouchCancel: React.PropTypes.func.isRequired,
        onTouchEnd: React.PropTypes.func.isRequired,
        onTouchMove: React.PropTypes.func.isRequired,
        onTouchStart: React.PropTypes.func.isRequired,
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

    render() {
        const {x, y, animateIntoPosition} = this.props;

        const animationStyle = animateIntoPosition ? {
            msTransitionDuration: '100ms',
            WebkitTransitionDuration: '100ms',
            transitionDuration: '100ms',
            msTransitionProperty: 'transform',
            WebkitTransitionProperty: 'transform',
            transitionProperty: 'transform',
        } : { };
        const transformString = `translate(${x}px, ${y}px)`;

        const outerStyle = {
            position: 'absolute',
            zIndex: 1,
            left: -touchTargetWidthPx / 2,
            top: 0,
            msTransform: transformString,
            WebkitTransform: transformString,
            transform: transformString,
            width: touchTargetWidthPx,
            height: touchTargetHeightPx,
            ...animationStyle,
        };

        const innerStyle = {
            marginLeft: touchTargetRadiusPx - cursorRadiusPx,
        };

        return <span
            style={outerStyle}
            onTouchStart={this.props.onTouchStart}
            onTouchMove={this.props.onTouchMove}
            onTouchEnd={this.props.onTouchEnd}
            onTouchCancel={this.props.onTouchCancel}
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
