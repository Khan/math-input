/**
 * A test keypad that displays a popover on top of a button.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const KeypadButton = require('./keypad-button');
const MultiSymbolPopover = require('./multi-symbol-popover');
const { keypad, row } = require('./styles');

const ButtonProps = require('./button-props');

const TestPopoverKeypad = React.createClass({
    render() {
        return <View style={keypad}>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.NUM_7} />
                <KeypadButton primaryKey={ButtonProps.NUM_8} />
                <MultiSymbolPopover
                    keys={[
                        ButtonProps.NUM_9,
                        ButtonProps.PLUS,
                        ButtonProps.MINUS,
                    ]}
                />
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
        </View>;
    },
});

module.exports = TestPopoverKeypad;
