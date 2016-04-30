/**
 * A test keypad that displays a popover on top of a button.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const Keypad = require('./keypad');
const TouchableKeypadButton = require('./touchable-keypad-button');
const MultiSymbolPopover = require('./multi-symbol-popover');
const { row } = require('./styles');

const KeyConfigs = require('../data/key-configs');

const TestPopoverKeypad = React.createClass({
    render() {
        return <Keypad>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_7} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_8} />
                <MultiSymbolPopover keys={[
                    KeyConfigs.NUM_9,
                    KeyConfigs.PLUS,
                    KeyConfigs.MINUS,
                ]}
                />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_4} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_5} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_6} />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_1} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_2} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_3} />
            </View>
        </Keypad>;
    },
});

module.exports = TestPopoverKeypad;
