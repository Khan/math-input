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
                <KeypadButton primaryKey={ButtonProps.SIN} />
                <KeypadButton primaryKey={ButtonProps.COS} />
                <KeypadButton primaryKey={ButtonProps.TAN} />
                <KeypadButton primaryKey={ButtonProps.NOOP} />
                <KeypadButton primaryKey={ButtonProps.NOOP} />
                <KeypadButton primaryKey={ButtonProps.NOOP} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.RADICAL} />
                <KeypadButton primaryKey={ButtonProps.LOG} />
                <KeypadButton primaryKey={ButtonProps.LOG_N} />
                <KeypadButton primaryKey={ButtonProps.NOOP} />
                <KeypadButton primaryKey={ButtonProps.NOOP} />
                <KeypadButton primaryKey={ButtonProps.PARENS} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.NUM_7} />
                <KeypadButton primaryKey={ButtonProps.NUM_8} />
                <KeypadButton primaryKey={ButtonProps.NUM_9} />
                <KeypadButton primaryKey={ButtonProps.PLUS} />
                <KeypadButton primaryKey={ButtonProps.EXP} />
                <KeypadButton primaryKey={ButtonProps.LEFT} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.NUM_4} />
                <KeypadButton primaryKey={ButtonProps.NUM_5} />
                <KeypadButton primaryKey={ButtonProps.NUM_6} />
                <KeypadButton primaryKey={ButtonProps.MINUS} />
                <KeypadButton primaryKey={ButtonProps.SQRT} />
                <KeypadButton primaryKey={ButtonProps.RIGHT} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.NUM_1} />
                <KeypadButton primaryKey={ButtonProps.NUM_2} />
                <KeypadButton primaryKey={ButtonProps.NUM_3} />
                <KeypadButton primaryKey={ButtonProps.TIMES} />
                <KeypadButton primaryKey={ButtonProps.CDOT} />
                <KeypadButton primaryKey={ButtonProps.EQUAL} />
            </View>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.x} />
                <KeypadButton primaryKey={ButtonProps.NUM_0} />
                <KeypadButton primaryKey={ButtonProps.DECIMAL} />
                <KeypadButton primaryKey={ButtonProps.DIVIDE} />
                <KeypadButton primaryKey={ButtonProps.FRAC} />
                <KeypadButton primaryKey={ButtonProps.BACKSPACE} />
            </View>
        </View>;
    },
});

module.exports = DefaultKeypad;
