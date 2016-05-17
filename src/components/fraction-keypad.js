/**
 * A keypad that includes the digits, as well as the symbols required to deal
 * with fractions, decimals, and percents.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const Keypad = require('./keypad');
const TouchableKeypadButton = require('./touchable-keypad-button');
const { row } = require('./styles');
const { BorderStyles } = require('../consts');

const KeyConfigs = require('../data/key-configs');

const FractionKeypad = React.createClass({
    render() {
        return <Keypad>
            <View style={row}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_7}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_8}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_9}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton keyConfig={KeyConfigs.FRAC} />
            </View>
            <View style={row}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_4}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_5}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_6}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton keyConfig={KeyConfigs.PERCENT} />
            </View>
            <View style={row}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_1}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_2}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_3}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.BACKSPACE}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={row}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.TOGGLE_SIGN}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_0}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DECIMAL}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DISMISS}
                    borders={BorderStyles.LEFT}
                />
            </View>
        </Keypad>;
    },
});

module.exports = FractionKeypad;
