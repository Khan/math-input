/**
 * This file contains props used by KeypadButtons in MathKeypad.  The reason
 * for defining them here is separate button actions and labels from styling
 * of those buttons.
 */

const actions = require('../actions');

const Keys = require('../data/keys');
const Symbols = require('../data/symbols');
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
        label: Symbols[key],
        onClick: onClick,
        type: keyType,
    };
}

for (const num of '0123456789') {
    const numButtonType = keyTypes.NUMERAL;
    ButtonProps[`NUM_${num}`] = {
        label: num,
        onClick: () => actions.pressKey(num, numButtonType),
        type: numButtonType,
    };
}

for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
    const varButtonType = keyTypes.MATH;
    ButtonProps[letter] = {
        label: letter,
        onClick: () => actions.pressKey(letter, varButtonType),
        type: varButtonType,
    };
}

ButtonProps[Keys.NOOP] = {
    label: '',
    onClick: () => {},
};

module.exports = ButtonProps;
