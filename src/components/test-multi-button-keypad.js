/**
 * A test keypad that includes a bunch of multipurpose buttons.
 *
 * TODO(charlie): Replace this with a proper Expression keypad once the
 * multi-buttons are further along.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const MultiSymbolKeypadButton = require('./multi-symbol-keypad-button');
const { keypad, row } = require('./styles');

const ButtonProps = require('./button-props');

const TestMultiButtonKeypad = React.createClass({
    render() {
        return <View style={keypad}>
            <View style={row}>
                <MultiSymbolKeypadButton
                    showAllSymbols={false}
                    keys={[ButtonProps.PLUS, ButtonProps.EXP, ButtonProps.MINUS]}
                />
                <MultiSymbolKeypadButton
                    showAllSymbols={true}
                    keys={[ButtonProps.PLUS, ButtonProps.EXP, ButtonProps.MINUS]}
                />
                <MultiSymbolKeypadButton
                    showAllSymbols={true}
                    keys={[ButtonProps.PLUS, ButtonProps.EXP]}
                />
            </View>
        </View>;
    },
});

module.exports = TestMultiButtonKeypad;
