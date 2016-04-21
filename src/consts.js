/**
 * Constants that are shared between multiple files.
 */

module.exports = {
    keypadTypes: {
        NUMBER: 'NUMBER',
        FRACTION: 'FRACTION',
        DEFAULT: 'DEFAULT',
        TEST_MULTI_BUTTON: 'TEST_MULTI_BUTTON',
        TEST_MULTI_PAGE: 'TEST_MULTI_PAGE',
        TEST_POPOVER: 'TEST_POPOVER',
    },

    keyTypes: {
        // For buttons that insert or adjust math in an input.
        MATH: 'MATH',
        // For buttons that move the cursor in an input (including via
        // deletion).
        INPUT_NAVIGATION: 'INPUT_NAVIGATION',
        // For buttons that modify the broader keypad state (e.g., by changing
        // the visible pane).
        KEYPAD_NAVIGATION: 'KEYPAD_NAVIGATION',
    },
};
