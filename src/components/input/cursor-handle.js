/**
 * Renders the green tear-shaped handle under the cursor.
 */

const React = require('react');

const zIndexes = require('./z-indexes');

const CursorHandle = React.createClass({
    propTypes: {
        onEnd: React.PropTypes.func.isRequired,
        onMove: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
    },

    getDefaultProps() {
        return {
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
        const { x, y } = this.props;

        const style = {
            ...handleStyle,
            left: x,
            top: y,
            visible: this.props.visible ? 'block' : 'none',
        };

        // TODO(kevinb) replace rotated div with SVG so the math makes sense
        return <div
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            onTouchCancel={this.handleTouchCancel}
            style={style}
        />;
    },
});

// This actually isn't the diameter, it's the diameter plus the distance
// the triangle corner is outside of the the circle within the pointer.
const cursorDiameterPx = 28;

const handleStyle = {
    position: 'absolute',
    background: '#78c008',
    width: cursorDiameterPx,
    height: cursorDiameterPx,
    borderRadius: '0 50% 50% 50%',
    marginTop: 0.3 * cursorDiameterPx,
    marginLeft: 1 - cursorDiameterPx / 2,
    zIndex: zIndexes.cursorHandle,
    transform: 'rotate(45deg)',
};

module.exports = CursorHandle;
