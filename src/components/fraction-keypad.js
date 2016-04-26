/**
 * A keypad that includes the digits, as well as the symbols required to deal
 * with fractions, decimals, and percents.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const Keypad = require('./keypad');
const SimpleKeypadButton = require('./simple-keypad-button');
const { row } = require('./styles');

const ButtonProps = require('./button-props');

const FractionKeypad = React.createClass({
    render() {
        return <Keypad>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_7} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_8} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_9} />
                <SimpleKeypadButton singleKey={ButtonProps.DIVIDE} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_4} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_5} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_6} />
                <SimpleKeypadButton singleKey={ButtonProps.PERCENT} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_1} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_2} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_3} />
                <SimpleKeypadButton singleKey={ButtonProps.BACKSPACE} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.TOGGLE_SIGN} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_0} />
                <SimpleKeypadButton singleKey={ButtonProps.DECIMAL} />
                <SimpleKeypadButton singleKey={ButtonProps.DISMISS} />
            </View>
        </Keypad>;
    },
});

module.exports = FractionKeypad;
