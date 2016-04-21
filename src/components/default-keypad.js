/**
 * A keypad that includes most of the available symbols, for testing.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const KeypadButton = require('./keypad-button');
const { keypad, row } = require('./styles');

const ButtonProps = require('./button-props');

const DefaultKeypad = React.createClass({
    render() {
        return <View style={keypad}>
            <View style={row}>
                <KeypadButton {...ButtonProps.NUM_7} />
                <KeypadButton {...ButtonProps.NUM_8} />
                <KeypadButton {...ButtonProps.NUM_9} />
                <KeypadButton {...ButtonProps.PLUS} />
                <KeypadButton {...ButtonProps.EXP} />
                <KeypadButton {...ButtonProps.LEFT} />
            </View>
            <View style={row}>
                <KeypadButton {...ButtonProps.NUM_4} />
                <KeypadButton {...ButtonProps.NUM_5} />
                <KeypadButton {...ButtonProps.NUM_6} />
                <KeypadButton {...ButtonProps.MINUS} />
                <KeypadButton {...ButtonProps.SQRT} />
                <KeypadButton {...ButtonProps.RIGHT} />
            </View>
            <View style={row}>
                <KeypadButton {...ButtonProps.NUM_1} />
                <KeypadButton {...ButtonProps.NUM_2} />
                <KeypadButton {...ButtonProps.NUM_3} />
                <KeypadButton {...ButtonProps.TIMES} />
                <KeypadButton {...ButtonProps.CDOT} />
                <KeypadButton {...ButtonProps.EQUAL} />
            </View>
            <View style={row}>
                <KeypadButton {...ButtonProps.x} />
                <KeypadButton {...ButtonProps.NUM_0} />
                <KeypadButton {...ButtonProps.DECIMAL} />
                <KeypadButton {...ButtonProps.DIVIDE} />
                <KeypadButton {...ButtonProps.FRAC} />
                <KeypadButton {...ButtonProps.BACKSPACE} />
            </View>
        </View>;
    },
});

module.exports = DefaultKeypad;
