/**
 * A single entry-point for all of the external-facing functionality.
 */

const {
    activateKeypad, dismissKeypad, configureKeypad,
} = require('./src/actions');
const actions = { activateKeypad, dismissKeypad, configureKeypad };

const components = {
    Keypad: require('./src/components/provided-keypad'),
    KeypadInput: require('./src/components/input/math-input'),
};

const { KeypadTypes } = require('./src/consts');
const consts = { KeypadTypes };

const {
    keypadConfigurationPropType,
    keypadElementPropType,
} = require('./src/components/prop-types');
const propTypes = { keypadConfigurationPropType, keypadElementPropType };

module.exports = {
    actions,
    components,
    consts,
    propTypes,
};
