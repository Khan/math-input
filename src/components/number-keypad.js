/**
 * A keypad that includes the basic digits. No frills.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const KeypadButton = require('./keypad-button');
const { keypad, row } = require('./styles');

const ButtonProps = require('./button-props');

const NumberKeypad = React.createClass({
    render() {
        return <View style={keypad}>
            <View style={row}>
                <KeypadButton {...ButtonProps.NUM_7} />
                <KeypadButton {...ButtonProps.NUM_8} />
                <KeypadButton {...ButtonProps.NUM_9} />
            </View>
            <View style={row}>
                <KeypadButton {...ButtonProps.NUM_4} />
                <KeypadButton {...ButtonProps.NUM_5} />
                <KeypadButton {...ButtonProps.NUM_6} />
            </View>
            <View style={row}>
                <KeypadButton {...ButtonProps.NUM_1} />
                <KeypadButton {...ButtonProps.NUM_2} />
                <KeypadButton {...ButtonProps.NUM_3} />
            </View>
            <View style={row}>
                <KeypadButton {...ButtonProps.BACKSPACE} />
                <KeypadButton {...ButtonProps.NUM_0} />
                <KeypadButton {...ButtonProps.DISMISS} />
            </View>
        </View>;
    },
});

module.exports = NumberKeypad;
