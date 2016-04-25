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
        return <KeypadButton primaryKey={this.props.singleKey} />;
    },
});

module.exports = SimpleKeypadButton;
