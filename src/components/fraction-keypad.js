/**
 * A keypad that includes the digits, as well as the symbols required to deal
 * with fractions, decimals, and percents.
 */

const React = require('react');
const {connect} = require('react-redux');

const {View} = require('../fake-react-native-web');
const Keypad = require('./keypad');
const TouchableKeypadButton = require('./touchable-keypad-button');
const {row} = require('./styles');
const {BorderStyles} = require('../consts');
const CursorContexts = require('./input/cursor-contexts');
const {cursorContextPropType} = require('./prop-types');

const KeyConfigs = require('../data/key-configs');

const FractionKeypad = React.createClass({
    propTypes: {
        cursorContext: cursorContextPropType.isRequired,
    },

    statics: {
        rows: 4,
        columns: 4,
        numPages: 1,
    },

    render() {
        const {cursorContext} = this.props;

        return <Keypad>
            <View style={row}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_7}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_8}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_9}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.FRAC_MULTI}
                    disabled={
                        // We can use `NESTED` rather than a more specific
                        // context (e.g., `IN_FRACTION`) because we know that
                        // the only way to create a nested expression in this
                        // keypad is by creating a fraction. If, for example, we
                        // added parentheses to this keypad, we'd need to create
                        // a more specific context.
                        cursorContext === CursorContexts.NESTED
                    }
                />
            </View>
            <View style={row}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_4}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_5}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_6}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton keyConfig={KeyConfigs.PERCENT} />
            </View>
            <View style={row}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_1}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_2}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_3}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.BACKSPACE}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={row}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NEGATIVE}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_0}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DECIMAL}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DISMISS}
                    borders={BorderStyles.LEFT}
                />
            </View>
        </Keypad>;
    },
});

const mapStateToProps = (state) => {
    return {
        cursorContext: state.input.cursor.context,
    };
};

module.exports = connect(mapStateToProps)(FractionKeypad);
