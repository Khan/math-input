/**
 * A keypad that includes a button to capture an arbitrary set of additional
 * symbols.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const SimpleKeypadButton = require('./simple-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const { keypad, row } = require('./styles');

const { keyPropType } = require('./prop-types');
const ButtonProps = require('./button-props');

const TestMultiSymbolKeypad = React.createClass({
    propTypes: {
        extraKeys: React.PropTypes.arrayOf(keyPropType),
    },

    render() {
        const { extraKeys } = this.props;

        return <View style={keypad}>
            <View style={row}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_7} />
                <ManyKeypadButton keys={[]} />
                <ManyKeypadButton keys={[extraKeys[0]]} />
                <ManyKeypadButton keys={extraKeys} />
            </View>
        </View>;
    },
});

module.exports = TestMultiSymbolKeypad;
