/**
 * A small triangular decal to sit in the corner of a parent component.
 */

const React = require('react');
const { View } = require('../fake-react-native-web');
const { StyleSheet } = require('aphrodite');

const CornerDecal = () => {
    return <View style={styles.triangle} />;
};

const triangleSizePx = 15;
const triangleColor = 'green';

const styles = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        // Draw the triangle by manipulating the border on one side.
        // See: https://css-tricks.com/snippets/css/css-triangle/.
        borderTop: `${triangleSizePx}px solid transparent`,
        borderBottom: `${triangleSizePx}px solid transparent`,
        borderLeft: `${triangleSizePx}px solid ${triangleColor}`,
        position: "absolute",
        // TODO(charlie): We only translate by (triangleSizePx - 1) because of
        // the 1px border on the parent view. Rejigger once we figure out the
        // border situation for real.
        transform: `rotate(-45deg) translateY(-${triangleSizePx - 1}px)`,
    },
});

module.exports = CornerDecal;
