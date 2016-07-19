/**
 * Constants that are shared between multiple files.
 */

module.exports = {
    KeypadTypes: {
        NUMBER: 'NUMBER',
        FRACTION: 'FRACTION',
        EXPRESSION: 'EXPRESSION',
    },

    KeyTypes: {
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
        // For the echo animation that appears on press.
        ECHO: 'ECHO',
    },

    BorderDirections: {
        LEFT: 'LEFT',
        BOTTOM: 'BOTTOM',
    },
    BorderStyles: {
        LEFT: ['LEFT'],
        BOTTOM: ['BOTTOM'],
        ALL: ['LEFT', 'BOTTOM'],
        NONE: [],
    },

    // Configurable settings.
    SwitchTypes: {
        TOGGLE: 'TOGGLE',
        TAB_BAR: 'TAB_BAR',
        PAGE_CONTROL: 'PAGE_CONTROL',
    },
    FractionBehaviorTypes: {
        INCLUSIVE: 'INCLUSIVE',
        EXCLUSIVE: 'EXCLUSIVE',
    },
    JumpOutTypes: {
        STATIC: 'STATIC',
        DYNAMIC: 'DYNAMIC',
    },
    EchoAnimationTypes: {
        SLIDE_AND_FADE: 'SLIDE_AND_FADE',
        FADE_ONLY: 'FADE_ONLY',
    },
    DebugSwitcherTypes: {
        ENABLED: 'ENABLED',
        DISABLED: 'DISABLED',
    },
};
