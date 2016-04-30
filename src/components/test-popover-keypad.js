/**
 * A test keypad that displays a popover on top of a button.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const Keypad = require('./keypad');
const TouchableKeypadButton = require('./touchable-keypad-button');
const { row } = require('./styles');

const actions = require('../actions');
const Keys = require('../data/keys');
const KeyConfigs = require('../data/key-configs');

const TestPopoverKeypad = React.createClass({
    componentDidMount() {
        actions.setActiveNodes({
            popover: Keys.FRAC_MULTI,
            focus: Keys.DIVIDE,
        });
    },

    render() {
        return <Keypad>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_7} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_8} />
                <TouchableKeypadButton keyConfig={KeyConfigs.FRAC_MULTI} />
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
