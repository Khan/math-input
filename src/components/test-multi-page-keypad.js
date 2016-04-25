/**
 * A test keypad with multiple pages.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const SimpleKeypadButton = require('./simple-keypad-button');
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
                    <SimpleKeypadButton singleKey={ButtonProps.NUM_1} />,
                    <SimpleKeypadButton singleKey={ButtonProps.NUM_2} />,
                    <SimpleKeypadButton singleKey={ButtonProps.MORE} />,
                ];
                break;

            case 1:
                keypadContents = [
                    <SimpleKeypadButton singleKey={ButtonProps.NUM_3} />,
                    <SimpleKeypadButton singleKey={ButtonProps.LEFT} />,
                    <SimpleKeypadButton singleKey={ButtonProps.NUMBERS} />,
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
