/**
 * A single entry-point for all of the external-facing functionality.
 */

const components = {
    Keypad: require('./components/provided-keypad'),
    KeypadInput: require('./components/input/math-input'),
};

const {FractionBehaviorTypes, KeypadTypes} = require('./consts');
const consts = {FractionBehaviorTypes, KeypadTypes};

const {
    keypadConfigurationPropType,
    keypadElementPropType,
} = require('./components/prop-types');
const propTypes = {keypadConfigurationPropType, keypadElementPropType};

module.exports = {
    components,
    consts,
    propTypes,
};
