/**
 * A keypad that includes the basic digits. No frills.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const Keypad = require('./keypad');
const SimpleKeypadButton = require('./simple-keypad-button');
const { row } = require('./styles');

const ButtonProps = require('./button-props');

const NumberKeypad = React.createClass({
    render() {
        return <Keypad>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_7} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_8} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_9} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_4} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_5} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_6} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_1} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_2} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_3} />
            </View>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.BACKSPACE} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_0} />
                <SimpleKeypadButton singleKey={ButtonProps.DISMISS} />
            </View>
        </Keypad>;
    },
});

module.exports = NumberKeypad;
