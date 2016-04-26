/**
 * A test keypad that displays a popover on top of a button.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const Keypad = require('./keypad');
const SimpleKeypadButton = require('./simple-keypad-button');
const MultiSymbolPopover = require('./multi-symbol-popover');
const { row } = require('./styles');

const ButtonProps = require('./button-props');

const TestPopoverKeypad = React.createClass({
    render() {
        return <Keypad>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_7} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_8} />
                <MultiSymbolPopover
                    keys={[
                        ButtonProps.NUM_9,
                        ButtonProps.PLUS,
                        ButtonProps.MINUS,
                    ]}
                />
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
        </Keypad>;
    },
});

module.exports = TestPopoverKeypad;
