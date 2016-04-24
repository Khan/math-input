/**
 * A keypad that includes a button to capture an arbitrary set of additional
 * symbols.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const KeypadButton = require('./keypad-button');
const { keypad, row } = require('./styles');

const { keyPropType } = require('./prop-types');
const ButtonProps = require('./button-props');

const TestMultiSymbolKeypad = React.createClass({
    propTypes: {
        extraKeys: React.PropTypes.arrayOf(keyPropType),
    },

    render() {
        const { extraKeys } = this.props;

        // If we have just one extra symbol, render it as a standard button.
        // Otherwise, capture them all in a single button with no 'default'
        // symbol.
        let extraKeysButton;
        if (extraKeys.length === 1) {
            extraKeysButton = <KeypadButton
                primaryKey={extraKeys[0]}
            />;
        } else {
            extraKeysButton = <KeypadButton
                secondaryKeys={extraKeys}
            />;
        }

        return <View style={keypad}>
            <View style={row}>
                <KeypadButton primaryKey={ButtonProps.NUM_7} />
                <KeypadButton primaryKey={ButtonProps.NUM_8} />
                <KeypadButton primaryKey={ButtonProps.NUM_9} />
                {extraKeysButton}
            </View>
        </View>;
    },
});

module.exports = TestMultiSymbolKeypad;
