/**
 * A keypad button containing no symbols and triggering no actions on click.
 */

const React = require('react');

const { keyTypes } = require('../consts');
const KeypadButton = require('./keypad-button');

const EmptyKeypadButton = (props) => {
    return <KeypadButton type={keyTypes.EMPTY} {...props} />;
};

module.exports = EmptyKeypadButton;
