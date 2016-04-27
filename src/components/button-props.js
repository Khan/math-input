/**
 * This file contains props used by KeypadButtons in MathKeypad.  The reason
 * for defining them here is separate button actions and labels from styling
 * of those buttons.
 */

const actions = require('../actions');

const Keys = require('../data/keys');
const KeyTypes = require('../data/key-types');
const CustomActions = require('../data/custom-actions');
const { keyTypes } = require('../consts');

const ButtonProps = {};

for (const key of Object.keys(Keys)) {
    const keyType = KeyTypes[key];

    // Use a custom action if necessary, or default to dispatching the raw
    // key-press event.
    const onClick = CustomActions[key] ||
        (() => actions.pressKey(key, keyType));

    ButtonProps[key] = {
        onClick: onClick,
        type: keyType,
    };
}

for (const num of '0123456789') {
    const numButtonType = keyTypes.NUMERAL;
    ButtonProps[`NUM_${num}`] = {
        onClick: () => actions.pressKey(num, numButtonType),
        type: numButtonType,
    };
}

for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
    const varButtonType = keyTypes.MATH;
    ButtonProps[letter] = {
        onClick: () => actions.pressKey(letter, varButtonType),
        type: varButtonType,
    };
}

ButtonProps[Keys.NOOP] = {
    label: '',
    onClick: () => {},
};

for (const key of Object.keys(ButtonProps)) {
    // Add in the key name, which is used to select the appropriate SVG image.
    ButtonProps[key] = {
        ...ButtonProps[key],
        name: key,
    };
}

module.exports = ButtonProps;
