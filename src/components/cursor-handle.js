/**
 * Renders the green tear-shaped handle under the cursor.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');
const { View } = require('../fake-react-native-web');

const CursorHandle = React.createClass({
    propTypes: {
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

    componentWillMount() {
        this.dynamicStyles = computeDynamicStyles(this.props.x, this.props.y);
    },

    componentWillUpdate(newProps, newState) {
        if (newProps.x !== this.props.x || newProps.y !== this.props.y) {
            this.dynamicStyles = computeDynamicStyles(newProps.x, newProps.y);
        }
    },

    render() {
        const style = [
            styles.cursorHandle,
            this.props.visible
                ? styles.visible
                : styles.hidden,
            this.dynamicStyles.position,
        ];

        return <View style={style} />;
    },
});

const cursorDiameterPx = 20;

const styles = StyleSheet.create({
    cursorHandle: {
        position: 'absolute',
        background: '#78c008',
        width: cursorDiameterPx,
        height: cursorDiameterPx,
        borderRadius: '0 50% 50% 50%',
        transform: 'rotate(45deg)',
        marginTop: 0.3 * cursorDiameterPx,
        marginLeft: 1 - cursorDiameterPx / 2,
    },
    visible: {
        display: 'block',
    },
    hidden: {
        display: 'none',
    },
});

const computeDynamicStyles = (x, y) => {
    return StyleSheet.create({
        position: {
            left: x,
            top: y,
        },
    });
};

module.exports = CursorHandle;
