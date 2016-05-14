/**
 * This file contains configuration settings for the buttons in the keypad.
 */

const Keys = require('../data/keys');
const { KeyTypes } = require('../consts');

const KeyConfigs = {
    // Basic math keys.
    [Keys.PLUS]: {
        type: KeyTypes.MATH,
    },
    [Keys.MINUS]: {
        type: KeyTypes.MATH,
    },
    [Keys.TOGGLE_SIGN]: {
        type: KeyTypes.MATH,
    },
    [Keys.TIMES]: {
        type: KeyTypes.MATH,
    },
    [Keys.DIVIDE]: {
        type: KeyTypes.MATH,
    },
    [Keys.DECIMAL]: {
        type: KeyTypes.MATH,
    },
    [Keys.PERCENT]: {
        type: KeyTypes.MATH,
    },
    [Keys.CDOT]: {
        type: KeyTypes.MATH,
    },
    [Keys.EQUAL]: {
        type: KeyTypes.MATH,
    },
    [Keys.NEQ]: {
        type: KeyTypes.MATH,
    },
    [Keys.GT]: {
        type: KeyTypes.MATH,
    },
    [Keys.LT]: {
        type: KeyTypes.MATH,
    },
    [Keys.GEQ]: {
        type: KeyTypes.MATH,
    },
    [Keys.LEQ]: {
        type: KeyTypes.MATH,
    },
    [Keys.FRAC]: {
        type: KeyTypes.MATH,
    },
    [Keys.EXP]: {
        type: KeyTypes.MATH,
    },
    [Keys.EXP_2]: {
        type: KeyTypes.MATH,
    },
    [Keys.EXP_3]: {
        type: KeyTypes.MATH,
    },
    [Keys.SQRT]: {
        type: KeyTypes.MATH,
    },
    [Keys.CUBE_ROOT]: {
        type: KeyTypes.MATH,
    },
    [Keys.RADICAL]: {
        type: KeyTypes.MATH,
    },
    [Keys.PARENS]: {
        type: KeyTypes.MATH,
    },
    [Keys.LN]: {
        type: KeyTypes.MATH,
    },
    [Keys.LOG]: {
        type: KeyTypes.MATH,
    },
    [Keys.LOG_N]: {
        type: KeyTypes.MATH,
    },
    [Keys.SIN]: {
        type: KeyTypes.MATH,
    },
    [Keys.COS]: {
        type: KeyTypes.MATH,
    },
    [Keys.TAN]: {
        type: KeyTypes.MATH,
    },
    [Keys.PI]: {
        type: KeyTypes.MATH,
        unicodeSymbol: '\u03C0',
    },
    [Keys.THETA]: {
        type: KeyTypes.MATH,
        unicodeSymbol: '\u03B8',
    },
    [Keys.NOOP]: {
        type: KeyTypes.EMPTY,
    },

    // Input navigation keys.
    [Keys.LEFT]: {
        type: KeyTypes.INPUT_NAVIGATION,
    },
    [Keys.RIGHT]: {
        type: KeyTypes.INPUT_NAVIGATION,
    },
    [Keys.JUMP_OUT]: {
        type: KeyTypes.INPUT_NAVIGATION,
    },
    [Keys.BACKSPACE]: {
        type: KeyTypes.INPUT_NAVIGATION,
    },

    // Keypad navigation keys.
    [Keys.DISMISS]: {
        type: KeyTypes.KEYPAD_NAVIGATION,
    },
    [Keys.MORE]: {
        type: KeyTypes.KEYPAD_NAVIGATION,
    },
    [Keys.NUMBERS]: {
        type: KeyTypes.KEYPAD_NAVIGATION,
    },

    // Multi-symboled keys.
    [Keys.FRAC_MULTI]: {
        type: KeyTypes.MATH,
        childKeyIds: [Keys.FRAC, Keys.DIVIDE],
    },
    [Keys.PARENS_MULTI]: {
        type: KeyTypes.MATH,
        childKeyIds: [Keys.PARENS, Keys.CDOT, Keys.TIMES],
    },
    [Keys.EQUAL_MULTI]: {
        type: KeyTypes.MATH,
        childKeyIds: [Keys.EQUAL, Keys.NEQ],
    },
    [Keys.LESS_MULTI]: {
        type: KeyTypes.MATH,
        childKeyIds: [Keys.LT, Keys.LEQ],
    },
    [Keys.GREATER_MULTI]: {
        type: KeyTypes.MATH,
        childKeyIds: [Keys.GT, Keys.GEQ],
    },
    [Keys.EXP_MULTI]: {
        type: KeyTypes.MATH,
        childKeyIds: [Keys.EXP_2, Keys.EXP_3, Keys.EXP],
    },
    [Keys.RADICAL_MULTI]: {
        type: KeyTypes.MATH,
        childKeyIds: [Keys.SQRT, Keys.CUBE_ROOT, Keys.RADICAL],
    },
    [Keys.LOG_MULTI]: {
        type: KeyTypes.MATH,
        childKeyIds: [Keys.LOG, Keys.LN, Keys.LOG_N],
    },

    [Keys.MANY]: {
        type: KeyTypes.MANY,
        // childKeyIds will be configured by the client.
    },
};

// Add in every numeral.
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const num of NUMBERS) {
    // TODO(charlie): Consider removing the SVG icons that we have for the
    // numeral keys. They can be rendered just as easily with text (though that
    // would mean that we'd be using text beyond the variable key).
    KeyConfigs[`NUM_${num}`] = {
        type: KeyTypes.NUMERAL,
        unicodeSymbol: `${num}`,
    };
}

// Add in every variable.
const LETTERS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];
for (const letter of LETTERS) {
    KeyConfigs[letter] = {
        type: KeyTypes.MATH,
        unicodeSymbol: letter.toLowerCase(),
    };
}

for (const key of Object.keys(KeyConfigs)) {
    KeyConfigs[key] = {
        ...KeyConfigs[key],
        id: key,
    };
}

module.exports = KeyConfigs;
