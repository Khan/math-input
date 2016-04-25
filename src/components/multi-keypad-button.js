/**
 * A keypad button that displays multiple symbols, with one 'default' symbol.
 */

const React = require('react');

const KeypadButton = require('./keypad-button');
const { keyPropType } = require('./prop-types');

const MultiKeypadButton = React.createClass({
    propTypes: {
        primaryKey: keyPropType.isRequired,
        secondaryKeys: React.PropTypes.arrayOf(keyPropType).isRequired,
        // Whether to show all (up to three) of the secondary key symbols, or
        // only the symbol that corresponds to the primary key.
        showAllSymbols: React.PropTypes.bool,
    },

    render() {
        return <KeypadButton {...this.props} />;
    },
});

module.exports = MultiKeypadButton;
