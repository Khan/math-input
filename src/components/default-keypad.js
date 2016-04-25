/**
 * A keypad that includes most of the available symbols, for testing.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const SimpleKeypadButton = require('./simple-keypad-button');
const { keypad, row } = require('./styles');

const ButtonProps = require('./button-props');

const DefaultKeypad = React.createClass({
    render() {
        return <View style={keypad}>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.SIN} />
                <SimpleKeypadButton singleKey={ButtonProps.COS} />
                <SimpleKeypadButton singleKey={ButtonProps.TAN} />
                <SimpleKeypadButton singleKey={ButtonProps.NOOP} />
                <SimpleKeypadButton singleKey={ButtonProps.NOOP} />
                <SimpleKeypadButton singleKey={ButtonProps.NOOP} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.RADICAL} />
                <SimpleKeypadButton singleKey={ButtonProps.LOG} />
                <SimpleKeypadButton singleKey={ButtonProps.LOG_N} />
                <SimpleKeypadButton singleKey={ButtonProps.NOOP} />
                <SimpleKeypadButton singleKey={ButtonProps.NOOP} />
                <SimpleKeypadButton singleKey={ButtonProps.PARENS} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_7} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_8} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_9} />
                <SimpleKeypadButton singleKey={ButtonProps.PLUS} />
                <SimpleKeypadButton singleKey={ButtonProps.EXP} />
                <SimpleKeypadButton singleKey={ButtonProps.LEFT} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_4} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_5} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_6} />
                <SimpleKeypadButton singleKey={ButtonProps.MINUS} />
                <SimpleKeypadButton singleKey={ButtonProps.SQRT} />
                <SimpleKeypadButton singleKey={ButtonProps.RIGHT} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_1} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_2} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_3} />
                <SimpleKeypadButton singleKey={ButtonProps.TIMES} />
                <SimpleKeypadButton singleKey={ButtonProps.CDOT} />
                <SimpleKeypadButton singleKey={ButtonProps.EQUAL} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.x} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_0} />
                <SimpleKeypadButton singleKey={ButtonProps.DECIMAL} />
                <SimpleKeypadButton singleKey={ButtonProps.DIVIDE} />
                <SimpleKeypadButton singleKey={ButtonProps.FRAC} />
                <SimpleKeypadButton singleKey={ButtonProps.BACKSPACE} />
            </View>
        </View>;
    },
});

module.exports = DefaultKeypad;
