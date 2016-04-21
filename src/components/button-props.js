/**
 * This file contains props used by KeypadButtons in MathKeypad.  The reason
 * for defining them here is separate button actions and labels from styling
 * of those buttons.
 */

const actions = require('../actions');

const Keys = require('../data/keys');
const Symbols = require('../data/symbols');

const ButtonProps = {};

for (const key of Object.keys(Keys)) {
    // TODO(charlie): The "dismiss" key needs to trigger a dismiss action,
    // rather than being treated as a key press to-be sent to and handled by
    // the input.
    ButtonProps[key] = {
        label: Symbols[key],
        onClick: () => actions.pressKey(key),
    };
}

for (const num of '0123456789') {
    ButtonProps[`NUM_${num}`] = {
        label: num,
        onClick: () => actions.pressKey(num),
    };
}

for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
    ButtonProps[letter] = {
        label: letter,
        onClick: () => actions.pressKey(letter),
    };
}

module.exports = ButtonProps;
