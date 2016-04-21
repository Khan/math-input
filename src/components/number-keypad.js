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
                <KeypadButton primaryKey={ButtonProps.NUM_7} />
                <KeypadButton primaryKey={ButtonProps.NUM_8} />
                <KeypadButton primaryKey={ButtonProps.NUM_9} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.NUM_4} />
                <KeypadButton primaryKey={ButtonProps.NUM_5} />
                <KeypadButton primaryKey={ButtonProps.NUM_6} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.NUM_1} />
                <KeypadButton primaryKey={ButtonProps.NUM_2} />
                <KeypadButton primaryKey={ButtonProps.NUM_3} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.BACKSPACE} />
                <KeypadButton primaryKey={ButtonProps.NUM_0} />
                <KeypadButton primaryKey={ButtonProps.DISMISS} />
            </View>
        </View>;
    },
});

module.exports = NumberKeypad;
