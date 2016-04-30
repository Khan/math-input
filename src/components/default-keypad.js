/**
 * A keypad that includes most of the available symbols, for testing.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const Keypad = require('./keypad');
const TouchableKeypadButton = require('./touchable-keypad-button');
const { row } = require('./styles');

const KeyConfigs = require('../data/key-configs');

const DefaultKeypad = React.createClass({
    render() {
        return <Keypad>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.SIN} />
                <TouchableKeypadButton keyConfig={KeyConfigs.COS} />
                <TouchableKeypadButton keyConfig={KeyConfigs.TAN} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NOOP} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NOOP} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NOOP} />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.RADICAL} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LOG} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LOG_N} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NOOP} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NOOP} />
                <TouchableKeypadButton keyConfig={KeyConfigs.PARENS} />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_7} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_8} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_9} />
                <TouchableKeypadButton keyConfig={KeyConfigs.PLUS} />
                <TouchableKeypadButton keyConfig={KeyConfigs.EXP} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LEFT} />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_4} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_5} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_6} />
                <TouchableKeypadButton keyConfig={KeyConfigs.MINUS} />
                <TouchableKeypadButton keyConfig={KeyConfigs.SQRT} />
                <TouchableKeypadButton keyConfig={KeyConfigs.RIGHT} />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_1} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_2} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_3} />
                <TouchableKeypadButton keyConfig={KeyConfigs.TIMES} />
                <TouchableKeypadButton keyConfig={KeyConfigs.CDOT} />
                <TouchableKeypadButton keyConfig={KeyConfigs.EQUAL} />
            </View>
            <View style={row}>
                <TouchableKeypadButton keyConfig={KeyConfigs.x} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_0} />
                <TouchableKeypadButton keyConfig={KeyConfigs.DECIMAL} />
                <TouchableKeypadButton keyConfig={KeyConfigs.DIVIDE} />
                <TouchableKeypadButton keyConfig={KeyConfigs.FRAC} />
                <TouchableKeypadButton keyConfig={KeyConfigs.BACKSPACE} />
            </View>
        </Keypad>;
    },
});

module.exports = DefaultKeypad;
