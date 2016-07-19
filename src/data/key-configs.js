/**
 * This file contains configuration settings for the buttons in the keypad.
 */

/* globals i18n */

const Keys = require('../data/keys');
const {KeyTypes} = require('../consts');

const KeyConfigs = {
    // Basic math keys.
    [Keys.PLUS]: {
        type: KeyTypes.MATH,
        // I18N: A label for a plus sign.
        ariaLabel: i18n._('Plus'),
    },
    [Keys.MINUS]: {
        type: KeyTypes.MATH,
        // I18N: A label for a minus sign.
        ariaLabel: i18n._('Minus'),
    },
    [Keys.TOGGLE_SIGN]: {
        type: KeyTypes.MATH,
        // TODO(charlie): Change this to 'Toggle negative' and add an
        // aria-pressed={true} based on the current state of the input. Right
        // now, that's tricky to do as the rendering of the keypad button is
        // ignorant of the contents of the input.
        // I18N: A label for a button that will change the input from positive
        // to negative or the other way around.
        ariaLabel: i18n._('Toggle positive/negative'),
    },
    [Keys.TIMES]: {
        type: KeyTypes.MATH,
        // I18N: A label for a multiplication sign (represented with an 'x').
        ariaLabel: i18n._('Multiply'),
    },
    [Keys.DIVIDE]: {
        type: KeyTypes.MATH,
        // I18N: A label for a division sign.
        ariaLabel: i18n._('Divide'),
    },
    [Keys.DECIMAL]: {
        type: KeyTypes.MATH,
        // I18N: A label for a percent symbol.
        ariaLabel: i18n._('Decimal'),
    },
    [Keys.PERCENT]: {
        type: KeyTypes.MATH,
        // I18N: A label for a percent sign.
        ariaLabel: i18n._('Percent'),
    },
    [Keys.CDOT]: {
        type: KeyTypes.MATH,
        // I18N: A label for a multiplication sign (represented as a dot).
        ariaLabel: i18n._('Multiply'),
    },
    [Keys.EQUAL]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Equals sign'),
    },
    [Keys.NEQ]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Not-equals sign'),
    },
    [Keys.GT]: {
        type: KeyTypes.MATH,
        // I18N: A label for a 'greater than' sign (represented as '>').
        ariaLabel: i18n._('Greater than sign'),
    },
    [Keys.LT]: {
        type: KeyTypes.MATH,
        // I18N: A label for a 'less than' sign (represented as '<').
        ariaLabel: i18n._('Less than sign'),
    },
    [Keys.GEQ]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Greater than or equal to sign'),
    },
    [Keys.LEQ]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Less than or equal to sign'),
    },
    [Keys.FRAC]: {
        type: KeyTypes.MATH,
        // I18N: A label for a 'fraction' symbol.
        ariaLabel: i18n._('Fraction'),
    },
    [Keys.EXP]: {
        type: KeyTypes.MATH,
        // I18N: A label for a button that will allow the user to input a custom
        // exponent.
        ariaLabel: i18n._('Custom exponent'),
    },
    [Keys.EXP_2]: {
        type: KeyTypes.MATH,
        // I18N: A label for a button that will square (take to the second
        // power) some math.
        ariaLabel: i18n._('Square'),
    },
    [Keys.EXP_3]: {
        type: KeyTypes.MATH,
        // I18N: A label for a button that will cube (take to the third power)
        // some math.
        ariaLabel: i18n._('Cube'),
    },
    [Keys.SQRT]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Square root'),
    },
    [Keys.CUBE_ROOT]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Cube root'),
    },
    [Keys.RADICAL]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Radical with custom root'),
    },
    [Keys.PARENS]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Parentheses'),
    },
    [Keys.LN]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Natural logarithm'),
    },
    [Keys.LOG]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Logarithm with base 10'),
    },
    [Keys.LOG_N]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Logarithm with custom base'),
    },
    [Keys.SIN]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Sine'),
    },
    [Keys.COS]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Cosine'),
    },
    [Keys.TAN]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Tangent'),
    },
    [Keys.PI]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Pi'),
        unicodeSymbol: {
            character: '\u03C0',
            italicized: true,
        },
    },
    [Keys.THETA]: {
        type: KeyTypes.MATH,
        ariaLabel: i18n._('Theta'),
        unicodeSymbol: {
            character: '\u03B8',
            italicized: true,
        },
    },
    [Keys.NOOP]: {
        type: KeyTypes.EMPTY,
    },

    // Input navigation keys.
    [Keys.LEFT]: {
        type: KeyTypes.INPUT_NAVIGATION,
        ariaLabel: i18n._('Left arrow'),
    },
    [Keys.RIGHT]: {
        type: KeyTypes.INPUT_NAVIGATION,
        ariaLabel: i18n._('Right arrow'),
    },
    [Keys.JUMP_OUT]: {
        type: KeyTypes.INPUT_NAVIGATION,
        ariaLabel: i18n._('Navigate right'),
    },
    [Keys.BACKSPACE]: {
        type: KeyTypes.INPUT_NAVIGATION,
        // I18N: A label for a button that will delete some input.
        ariaLabel: i18n._('Delete'),
    },

    // Keypad navigation keys.
    [Keys.DISMISS]: {
        type: KeyTypes.KEYPAD_NAVIGATION,
        // I18N: A label for a button that will dismiss/hide a keypad.
        ariaLabel: i18n._('Dismiss'),
    },
};

// Add in the multi-function buttons, which inherit some fields from the simple
// buttons.
// TODO(charlie): Make the multi-function button's long-press interaction
// accessible. Right now, it isn't possible to trigger any of the hidden buttons
// with a VoiceOver cursor--all you can do is trigger the default action.
KeyConfigs[Keys.FRAC_MULTI] = {
    type: KeyTypes.MATH,
    childKeyIds: [Keys.FRAC, Keys.DIVIDE],
    ariaLabel: KeyConfigs[Keys.FRAC].ariaLabel,
};
KeyConfigs[Keys.PARENS_MULTI] = {
    type: KeyTypes.MATH,
    childKeyIds: [Keys.PARENS, Keys.CDOT, Keys.TIMES],
    ariaLabel: KeyConfigs[Keys.PARENS].ariaLabel,
};

// NOTE(charlie): The multi-functional keys below use the icons of their
// 'default' keys by pointing to them in iconography/index.js. If the defaults
// change for any of these keys, the reference in iconography/index.js should
// change as well.
KeyConfigs[Keys.EQUAL_MULTI] = {
    type: KeyTypes.MATH,
    childKeyIds: [Keys.EQUAL, Keys.NEQ],
    ariaLabel: KeyConfigs[Keys.EQUAL].ariaLabel,
};
KeyConfigs[Keys.GREATER_MULTI] = {
    type: KeyTypes.MATH,
    childKeyIds: [Keys.GT, Keys.GEQ],
    ariaLabel: KeyConfigs[Keys.GT].ariaLabel,
};
KeyConfigs[Keys.LESS_MULTI] = {
    type: KeyTypes.MATH,
    childKeyIds: [Keys.LT, Keys.LEQ],
    ariaLabel: KeyConfigs[Keys.LT].ariaLabel,
};
KeyConfigs[Keys.EXP_MULTI] = {
    type: KeyTypes.MATH,
    childKeyIds: [Keys.EXP_2, Keys.EXP_3, Keys.EXP],
    ariaLabel: KeyConfigs[Keys.EXP_2].ariaLabel,
};
KeyConfigs[Keys.RADICAL_MULTI] = {
    type: KeyTypes.MATH,
    childKeyIds: [Keys.SQRT, Keys.CUBE_ROOT, Keys.RADICAL],
    ariaLabel: KeyConfigs[Keys.SQRT].ariaLabel,
};
KeyConfigs[Keys.LOG_MULTI] = {
    type: KeyTypes.MATH,
    childKeyIds: [Keys.LOG, Keys.LN, Keys.LOG_N],
    ariaLabel: KeyConfigs[Keys.LOG].ariaLabel,
};

KeyConfigs[Keys.MANY] = {
    type: KeyTypes.MANY,
    // childKeyIds will be configured by the client.
};

// Add in every numeral.
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const num of NUMBERS) {
    // TODO(charlie): Consider removing the SVG icons that we have for the
    // numeral keys. They can be rendered just as easily with text (though that
    // would mean that we'd be using text beyond the variable key).
    const textRepresentation = `${num}`;
    KeyConfigs[`NUM_${num}`] = {
        type: KeyTypes.NUMERAL,
        ariaLabel: textRepresentation,
        unicodeSymbol: {
            character: textRepresentation,
            italicized: false,
        },
    };
}

// Add in every variable.
const LETTERS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];
for (const letter of LETTERS) {
    const lowerCaseVariable = letter.toLowerCase();
    const upperCaseVariable = letter.toUpperCase();

    for (const textRepresentation of [lowerCaseVariable, upperCaseVariable]) {
        KeyConfigs[textRepresentation] = {
            type: KeyTypes.MATH,
            ariaLabel: textRepresentation,
            unicodeSymbol: {
                character: textRepresentation,
                italicized: true,
            },
        };
    }
}

for (const key of Object.keys(KeyConfigs)) {
    KeyConfigs[key] = {
        ...KeyConfigs[key],
        id: key,
    };
}

module.exports = KeyConfigs;
