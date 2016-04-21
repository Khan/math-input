/**
 * A test keypad with multiple pages.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const KeypadButton = require('./keypad-button');
const { keypad, row } = require('./styles');

const ButtonProps = require('./button-props');

const TestMultiPageKeypad = React.createClass({
    propTypes: {
        page: React.PropTypes.number.isRequired,
    },

    render() {
        let keypadContents;
        switch (this.props.page) {
            case 0:
                keypadContents = [
                    <KeypadButton primaryKey={ButtonProps.NUM_1} />,
                    <KeypadButton primaryKey={ButtonProps.NUM_2} />,
                    <KeypadButton primaryKey={ButtonProps.MORE} />,
                ];
                break;

            case 1:
                keypadContents = [
                    <KeypadButton primaryKey={ButtonProps.NUM_3} />,
                    <KeypadButton primaryKey={ButtonProps.LEFT} />,
                    <KeypadButton primaryKey={ButtonProps.NUMBERS} />,
                ];
                break;

            default:
                throw new Error(
                    "Invalid page index for keypad: " + this.props.page);
        }


        return <View style={keypad}>
            <View style={row}>
                {keypadContents}
            </View>
        </View>;
    },
});

module.exports = TestMultiPageKeypad;
