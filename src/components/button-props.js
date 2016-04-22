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
    // Use a custom action if necessary, or default to dispatching the raw
    // key-press event.
    const onClick = CustomActions[key] ||
        (() => actions.pressKey(key, KeyTypes[key]));

    ButtonProps[key] = {
        label: Symbols[key],
        onClick: onClick,
    };
}

for (const num of '0123456789') {
    ButtonProps[`NUM_${num}`] = {
        label: num,
        onClick: () => actions.pressKey(num, keyTypes.MATH),
    };
}

for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
    ButtonProps[letter] = {
        label: letter,
        onClick: () => actions.pressKey(letter, keyTypes.MATH),
    };
}

ButtonProps[Keys.NOOP] = {
    label: '',
    onClick: () => {},
};

module.exports = ButtonProps;
