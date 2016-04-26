/**
 * A simple keypad button that displays a single symbol.
 */

const React = require('react');

const KeypadButton = require('./keypad-button');
const { keyPropType } = require('./prop-types');

const SimpleKeypadButton = React.createClass({
    propTypes: {
        singleKey: keyPropType.isRequired,
    },

    render() {
        const { singleKey } = this.props;
        return <KeypadButton primaryKey={singleKey} />;
    },
});

module.exports = SimpleKeypadButton;
