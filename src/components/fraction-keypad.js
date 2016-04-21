/**
 * A keypad that includes the digits, as well as the symbols required to deal
 * with fractions, decimals, and percents.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const KeypadButton = require('./keypad-button');
const { keypad, row } = require('./styles');

const ButtonProps = require('./button-props');

const FractionKeypad = React.createClass({
    render() {
        return <View style={keypad}>
            <View style={row}>
                <KeypadButton {...ButtonProps.NUM_7} />
                <KeypadButton {...ButtonProps.NUM_8} />
                <KeypadButton {...ButtonProps.NUM_9} />
                <KeypadButton {...ButtonProps.DIVIDE} />
            </View>
            <View style={row}>
                <KeypadButton {...ButtonProps.NUM_4} />
                <KeypadButton {...ButtonProps.NUM_5} />
                <KeypadButton {...ButtonProps.NUM_6} />
                <KeypadButton {...ButtonProps.PERCENT} />
            </View>
            <View style={row}>
                <KeypadButton {...ButtonProps.NUM_1} />
                <KeypadButton {...ButtonProps.NUM_2} />
                <KeypadButton {...ButtonProps.NUM_3} />
                <KeypadButton {...ButtonProps.BACKSPACE} />
            </View>
            <View style={row}>
                <KeypadButton {...ButtonProps.TOGGLE_SIGN} />
                <KeypadButton {...ButtonProps.NUM_0} />
                <KeypadButton {...ButtonProps.DECIMAL} />
                <KeypadButton {...ButtonProps.DISMISS} />
            </View>
        </View>;
    },
});

module.exports = FractionKeypad;
