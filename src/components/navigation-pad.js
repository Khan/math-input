/**
 * A component that renders a navigation pad, which consists of an arrow for
 * each possible direction.
 */
const React = require('react');

const {StyleSheet} = require('aphrodite');
const {View} = require('../fake-react-native-web');
const TouchableKeypadButton = require('./touchable-keypad-button');
const {row, column, centered, stretch} = require('./styles');
const {controlGrey, valueGrey, gray85} = require('./common-style');
const {BorderStyles} = require('../consts');
const KeyConfigs = require('../data/key-configs');

const NavigationPad = React.createClass({
    render() {
        // TODO(charlie): Disable the navigational arrows depending on the
        // cursor context.
        return <View style={[column, centered, styles.background]}>
            <View style={[row, centered]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.UP}
                    borders={BorderStyles.NONE}
                    style={[styles.navigationKey, styles.topArrow]}
                />
            </View>
            <View style={[row, centered, stretch]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LEFT}
                    borders={BorderStyles.NONE}
                    style={[styles.navigationKey, styles.leftArrow]}
                />
                <View style={styles.horizontalSpacer} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.RIGHT}
                    borders={BorderStyles.NONE}
                    style={[styles.navigationKey, styles.rightArrow]}
                />
            </View>
            <View style={[row, centered]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DOWN}
                    borders={BorderStyles.NONE}
                    style={[styles.navigationKey, styles.bottomArrow]}
                />
            </View>
        </View>;
    },
});

const horizontalInsetPx = 24;
const buttonSizePx = 48;
const borderRadiusPx = 4;
const borderWidthPx = 1;

const styles = StyleSheet.create({
    background: {
        backgroundColor: controlGrey,
        paddingLeft: horizontalInsetPx,
        paddingRight: horizontalInsetPx,
    },

    navigationKey: {
        borderColor: gray85,
        backgroundColor: valueGrey,
        width: buttonSizePx,
        height: buttonSizePx,

        // Remove the focus state inset.
        padding: 0,

        // Override the default box-sizing so that our buttons are
        // `buttonSizePx` exclusive of their borders.
        boxSizing: 'content-box',
    },

    topArrow: {
        borderTopWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderTopRightRadius: borderRadiusPx,
    },

    rightArrow: {
        borderTopWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderTopRightRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },

    bottomArrow: {
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomLeftRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },

    leftArrow: {
        borderTopWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderBottomLeftRadius: borderRadiusPx,
    },

    horizontalSpacer: {
        background: valueGrey,
        // No need to set a height -- the spacer will be stretched by its
        // parent.
        width: buttonSizePx,
    },
});

module.exports = NavigationPad;
