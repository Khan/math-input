/**
 * Renders the green tear-shaped handle under the cursor.
 */

const React = require('react');

const {
    cursorHandleRadiusPx,
    brightGreen,
    cursorHandleDistanceMultiplier,
} = require('../common-style');

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
            left: 0,
            top: 0,
            transform: `translate(${x}px, ${y}px)`,
            ...animationStyle,
        };

        const innerStyle = {
            marginLeft: '-50%',
        };

        const radius = cursorHandleRadiusPx;
        const height = cursorHandleDistanceMultiplier * radius + radius;
        const width = 2 * radius;

        return <span style={outerStyle}>
            <svg
                width={width}
                height={height}
                viewBox={`-${radius} 0 ${width} ${height}`}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
                onTouchCancel={this.handleTouchCancel}
                style={innerStyle}
            >
                <path
                    d={
                        `M 0 0
                        L -${0.707 * radius} ${0.707 * radius}
                        A ${radius} ${radius}, 0, 1, 0,
                          ${0.707 * radius} ${0.707 * radius}
                        Z`
                    }
                    fill={brightGreen}
                />
            </svg>
        </span>;
    },
});

module.exports = CursorHandle;
