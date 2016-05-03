/**
 * Render the selection rectangle as an underlay below the selected nodes
 * within the MathQuill tree.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../../fake-react-native-web');
const zIndexes = require('./z-indexes');

const SelectionRect = React.createClass({
    propTypes: {
        height: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired,
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
    },

    render() {
        const dynamicStyles = StyleSheet.create({
            highlight: {
                left: this.props.x,
                top: this.props.y,
                width: this.props.width,
                height: this.props.height,
            },
        });

        const styles = [staticStyles.highlight, dynamicStyles.highlight];

        return <View style={styles} />;
    },
});

const staticStyles = StyleSheet.create({
    highlight: {
        position: 'absolute',
        display: 'inline-block',
        backgroundColor: '#78c008',
        zIndex: zIndexes.selectionRect,
    },
});

module.exports = SelectionRect;
