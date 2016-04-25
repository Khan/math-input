/**
 * A keypad button containing no symbols and triggering no actions on click.
 */

const React = require('react');

const KeypadButton = require('./keypad-button');

const EmptyKeypadButton = () => {
    return <KeypadButton />;
};

module.exports = EmptyKeypadButton;
