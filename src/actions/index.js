module.exports = {
    // naming convetion: verb + noun
    // the noun should be one of the other properties in the object that's
    // being dispatched
    dismissKeypad() {
        return {
            type: 'DismissKeypad',
        };
    },

    activateKeypad() {
        return {
            type: 'ActivateKeypad',
        };
    },

    /**
     * Configure the keypad with the provided configuration parameters.
     *
     * See: `prop-types.js#keypadConfigurationPropType`.
     */
    configureKeypad(configuration) {
        return {
            type: 'ConfigureKeypad',
            configuration,
        };
    },

    setButtonHeightPx(buttonHeightPx) {
        return {
            type: 'SetButtonHeightPx',
            buttonHeightPx,
        };
    },

    setPageWidthPx(pageWidthPx) {
        return {
            type: 'SetPageWidthPx',
            pageWidthPx,
        };
    },

    setKeypadCurrentPage(page) {
        return {
            type: 'SetKeypadCurrentPage',
            page,
        };
    },

    removeEcho(animationId) {
        return {
            type: 'RemoveEcho',
            animationId,
        };
    },

    // Input-related actions.
    setKeyHandler(keyHandler) {
        return {
            type: 'SetKeyHandler',
            keyHandler,
        };
    },

    setCursor(cursor) {
        return {
            type: 'SetCursor',
            cursor,
        };
    },
};
