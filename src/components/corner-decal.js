/**
 * A small triangular decal to sit in the corner of a parent component.
 */

const React = require('react');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const {gray76} = require('./common-style');

const CornerDecal = () => {
    const points = `0,0 ${triangleSizePx},0 ` +
        `${triangleSizePx},${triangleSizePx} 0,0`;
    const fill = triangleColor;

    // TODO(charlie): Separate out the contents of the corner decal from its
    // positioning. Not necessary now, but it will be if external users need
    // more fine-grained control over the styling of the keypad.
    return <View style={styles.triangle}>
        <svg>
            <polygon points={points} fill={fill} />
        </svg>
    </View>;
};

const triangleSizePx = 8;
const triangleColor = gray76;

const styles = StyleSheet.create({
    triangle: {
        position: "absolute",
        top: 0,
        right: 0,
        width: triangleSizePx,
        height: triangleSizePx,
    },
});

module.exports = CornerDecal;
