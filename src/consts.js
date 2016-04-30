/**
 * Constants that are shared between multiple files.
 */

module.exports = {
    keypadTypes: {
        NUMBER: 'NUMBER',
        FRACTION: 'FRACTION',
        DEFAULT: 'DEFAULT',
        ADVANCED_EXPRESSION: 'ADVANCED_EXPRESSION',
        BASIC_EXPRESSION: 'BASIC_EXPRESSION',
        TEST_POPOVER: 'TEST_POPOVER',
    },

    keyTypes: {
        EMPTY: 'EMPTY',
        // For buttons that insert or adjust math in an input.
        MATH: 'MATH',
        // For numerals in particular.
        NUMERAL: 'NUMERAL',
        // For buttons that move the cursor in an input (including via
        // deletion).
        INPUT_NAVIGATION: 'INPUT_NAVIGATION',
        // For buttons that modify the broader keypad state (e.g., by changing
        // the visible pane).
        KEYPAD_NAVIGATION: 'KEYPAD_NAVIGATION',
        // For buttons that house multiple buttons and have no action
        // themselves.
        MANY: 'MANY',
    },
};
