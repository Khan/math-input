/**
 * A test keypad that includes a bunch of multipurpose buttons.
 *
 * TODO(charlie): Replace this with a proper Expression keypad once the
 * multi-buttons are further along.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const MultiKeypadButton = require('./multi-keypad-button');
const { keypad, row } = require('./styles');

const ButtonProps = require('./button-props');

const TestMultiButtonKeypad = React.createClass({
    render() {
        return <View style={keypad}>
            <View style={row}>
                <MultiKeypadButton
                    primaryKey={ButtonProps.PLUS}
                    secondaryKeys={[ButtonProps.EXP, ButtonProps.MINUS]}
                    showAllSymbols={false}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.PLUS}
                    secondaryKeys={[ButtonProps.EXP, ButtonProps.MINUS]}
                    showAllSymbols={true}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.PLUS}
                    secondaryKeys={[ButtonProps.EXP]}
                    showAllSymbols={true}
                />
            </View>
        </View>;
    },
});

module.exports = TestMultiButtonKeypad;
