/**
 * The 'types' of the various keys in the keypad. These are used to determine
 * how presses should be handled at a level above handling the actual effects
 * of the press on the math input.
 *
 * For example, in some cases, we may want to return the user to the keypad's
 * primary page, but only when they input math, and not on navigation events.
 */

const Keys = require('./keys');
const { keyTypes } = require('../consts');

const KeyTypes = {
    [Keys.LEFT]: keyTypes.INPUT_NAVIGATION,
    [Keys.RIGHT]: keyTypes.INPUT_NAVIGATION,
    [Keys.BACKSPACE]: keyTypes.INPUT_NAVIGATION,
    [Keys.DISMISS]: keyTypes.KEYPAD_NAVIGATION,
    [Keys.MORE]: keyTypes.KEYPAD_NAVIGATION,
    [Keys.NUMBERS]: keyTypes.KEYPAD_NAVIGATION,
};

// Default to MATH, if the key type wasn't explicitly specified above.
Object.keys(Keys).forEach(key => {
    if (!KeyTypes[key]) {
        KeyTypes[key] = keyTypes.MATH;
    }
});

module.exports = KeyTypes;
