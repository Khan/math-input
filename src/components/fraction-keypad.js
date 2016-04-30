/**
 * A keypad that includes the digits, as well as the symbols required to deal
 * with fractions, decimals, and percents.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const Keypad = require('./keypad');
const TouchableKeypadButton = require('./touchable-keypad-button');
const { row } = require('./styles');

const KeyConfigs = require('../data/key-configs');

const FractionKeypad = React.createClass({
    render() {
        return <Keypad>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_7} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_8} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_9} />
                <TouchableKeypadButton keyConfig={KeyConfigs.DIVIDE} />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_4} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_5} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_6} />
                <TouchableKeypadButton keyConfig={KeyConfigs.PERCENT} />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_1} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_2} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_3} />
                <TouchableKeypadButton keyConfig={KeyConfigs.BACKSPACE} />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.TOGGLE_SIGN} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_0} />
                <TouchableKeypadButton keyConfig={KeyConfigs.DECIMAL} />
                <TouchableKeypadButton keyConfig={KeyConfigs.DISMISS} />
            </View>
        </Keypad>;
    },
});

module.exports = FractionKeypad;
