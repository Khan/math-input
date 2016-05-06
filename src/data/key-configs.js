/**
 * This file contains configuration settings for the buttons in the keypad.
 */

const Keys = require('../data/keys');
const { keyTypes } = require('../consts');

const KeyConfigs = {
    // Basic math keys.
    [Keys.PLUS]: {
        type: keyTypes.MATH,
    },
    [Keys.MINUS]: {
        type: keyTypes.MATH,
    },
    [Keys.TOGGLE_SIGN]: {
        type: keyTypes.MATH,
    },
    [Keys.TIMES]: {
        type: keyTypes.MATH,
    },
    [Keys.DIVIDE]: {
        type: keyTypes.MATH,
    },
    [Keys.DECIMAL]: {
        type: keyTypes.MATH,
    },
    [Keys.PERCENT]: {
        type: keyTypes.MATH,
    },
    [Keys.CDOT]: {
        type: keyTypes.MATH,
    },
    [Keys.EQUAL]: {
        type: keyTypes.MATH,
    },
    [Keys.NEQ]: {
        type: keyTypes.MATH,
    },
    [Keys.GT]: {
        type: keyTypes.MATH,
    },
    [Keys.LT]: {
        type: keyTypes.MATH,
    },
    [Keys.GEQ]: {
        type: keyTypes.MATH,
    },
    [Keys.LEQ]: {
        type: keyTypes.MATH,
    },
    [Keys.FRAC]: {
        type: keyTypes.MATH,
    },
    [Keys.EXP]: {
        type: keyTypes.MATH,
    },
    [Keys.EXP_2]: {
        type: keyTypes.MATH,
    },
    [Keys.EXP_3]: {
        type: keyTypes.MATH,
    },
    [Keys.SQRT]: {
        type: keyTypes.MATH,
    },
    [Keys.CUBE_ROOT]: {
        type: keyTypes.MATH,
    },
    [Keys.RADICAL]: {
        type: keyTypes.MATH,
    },
    [Keys.PARENS]: {
        type: keyTypes.MATH,
    },
    [Keys.LN]: {
        type: keyTypes.MATH,
    },
    [Keys.LOG]: {
        type: keyTypes.MATH,
    },
    [Keys.LOG_N]: {
        type: keyTypes.MATH,
    },
    [Keys.SIN]: {
        type: keyTypes.MATH,
    },
    [Keys.COS]: {
        type: keyTypes.MATH,
    },
    [Keys.TAN]: {
        type: keyTypes.MATH,
    },
    [Keys.PI]: {
        type: keyTypes.MATH,
    },
    [Keys.NOOP]: {
        type: keyTypes.EMPTY,
    },

    // Input navigation keys.
    [Keys.LEFT]: {
        type: keyTypes.INPUT_NAVIGATION,
    },
    [Keys.RIGHT]: {
        type: keyTypes.INPUT_NAVIGATION,
    },
    [Keys.JUMP_OUT]: {
        type: keyTypes.INPUT_NAVIGATION,
    },
    [Keys.BACKSPACE]: {
        type: keyTypes.INPUT_NAVIGATION,
    },

    // Keypad navigation keys.
    [Keys.DISMISS]: {
        type: keyTypes.KEYPAD_NAVIGATION,
    },
    [Keys.MORE]: {
        type: keyTypes.KEYPAD_NAVIGATION,
    },
    [Keys.NUMBERS]: {
        type: keyTypes.KEYPAD_NAVIGATION,
    },

    // Multi-symboled keys.
    [Keys.FRAC_MULTI]: {
        type: keyTypes.MATH,
        childKeyIds: [Keys.FRAC, Keys.DIVIDE],
    },
    [Keys.PARENS_MULTI]: {
        type: keyTypes.MATH,
        childKeyIds: [Keys.PARENS, Keys.CDOT, Keys.TIMES],
    },
    [Keys.EQUAL_MULTI]: {
        type: keyTypes.MATH,
        childKeyIds: [Keys.EQUAL, Keys.NEQ],
    },
    [Keys.LESS_MULTI]: {
        type: keyTypes.MATH,
        childKeyIds: [Keys.LT, Keys.LEQ],
    },
    [Keys.GREATER_MULTI]: {
        type: keyTypes.MATH,
        childKeyIds: [Keys.GT, Keys.GEQ],
    },
    [Keys.EXP_MULTI]: {
        type: keyTypes.MATH,
        childKeyIds: [Keys.EXP_2, Keys.EXP_3, Keys.EXP],
    },
    [Keys.RADICAL_MULTI]: {
        type: keyTypes.MATH,
        childKeyIds: [Keys.SQRT, Keys.CUBE_ROOT, Keys.RADICAL],
    },
    [Keys.LOG_MULTI]: {
        type: keyTypes.MATH,
        childKeyIds: [Keys.LOG, Keys.LN, Keys.LOG_N],
    },

    [Keys.MANY]: {
        type: keyTypes.MANY,
        // childKeyIds will be configured by the client.
    },
};

// Add in every numeral.
for (const num of '0123456789') {
    KeyConfigs[`NUM_${num}`] = {
        type: keyTypes.NUMERAL,
    };
}

// Add in every variable.
for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
    KeyConfigs[letter] = {
        type: keyTypes.MATH,
    };
}

for (const key of Object.keys(KeyConfigs)) {
    KeyConfigs[key] = {
        ...KeyConfigs[key],
        id: key,
    };
}

module.exports = KeyConfigs;
