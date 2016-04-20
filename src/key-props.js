/**
 * This file contains props used by KeypadButtons in MathKeypad.  The reason
 * for defining them here is separate button actions and labels from styling
 * of those buttons.
 */

const Symbols = require('./symbols');
const actions = require('./actions');

const Keys = require('./keys');

const KeyProps = {};

for (const key of Object.keys(Keys)) {
    KeyProps[key] = {
        label: Symbols[key],
        onClick: () => actions.pressKey(key),
    };
}

for (const num of '0123456789') {
    KeyProps[`NUM_${num}`] = {
        label: num,
        onClick: () => actions.pressKey(num),
    };
}

for (const letter of 'xyz') {
    KeyProps[letter] = {
        label: letter,
        onClick: () => actions.pressKey(letter),
    };
}

module.exports = KeyProps;
