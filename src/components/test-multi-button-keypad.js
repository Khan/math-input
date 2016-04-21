/**
 * A test keypad that includes a bunch of multipurpose buttons.
 *
 * TODO(charlie): Replace this with a proper Expression keypad once the
 * multi-buttons are further along.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const KeypadButton = require('./keypad-button');
const { keypad, row } = require('./styles');

const ButtonProps = require('./button-props');

const TestMultiButtonKeypad = React.createClass({
    render() {
        return <View style={keypad}>
            <View style={row}>
                <KeypadButton
                    showAllSymbols={false}
                    primaryKey={ButtonProps.PLUS}
                    secondaryKeys={[ButtonProps.EXP, ButtonProps.MINUS]}
                />
                <KeypadButton
                    showAllSymbols={true}
                    primaryKey={ButtonProps.PLUS}
                    secondaryKeys={[ButtonProps.EXP, ButtonProps.MINUS]}
                />
                <KeypadButton
                    showAllSymbols={true}
                    primaryKey={ButtonProps.PLUS}
                    secondaryKeys={[ButtonProps.EXP]}
                />
            </View>
        </View>;
    },
});

module.exports = TestMultiButtonKeypad;
