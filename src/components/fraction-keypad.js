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
                <KeypadButton primaryKey={ButtonProps.NUM_7} />
                <KeypadButton primaryKey={ButtonProps.NUM_8} />
                <KeypadButton primaryKey={ButtonProps.NUM_9} />
                <KeypadButton primaryKey={ButtonProps.DIVIDE} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.NUM_4} />
                <KeypadButton primaryKey={ButtonProps.NUM_5} />
                <KeypadButton primaryKey={ButtonProps.NUM_6} />
                <KeypadButton primaryKey={ButtonProps.PERCENT} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.NUM_1} />
                <KeypadButton primaryKey={ButtonProps.NUM_2} />
                <KeypadButton primaryKey={ButtonProps.NUM_3} />
                <KeypadButton primaryKey={ButtonProps.BACKSPACE} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.TOGGLE_SIGN} />
                <KeypadButton primaryKey={ButtonProps.NUM_0} />
                <KeypadButton primaryKey={ButtonProps.DECIMAL} />
                <KeypadButton primaryKey={ButtonProps.DISMISS} />
            </View>
        </View>;
    },
});

module.exports = FractionKeypad;
