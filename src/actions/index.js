const store = require('../store');

module.exports = {
    // naming convetion: verb + noun
    // the noun should be one of the other properties in the object that's
    // being dispatched
    dismissKeypad: function() {
        store.dispatch({
            type: 'DismissKeypad',
        });
    },

    activateKeypad: function() {
        store.dispatch({
            type: 'ActivateKeypad',
        });
    },

    /**
     * Configure the keypad with the provided configuration parameters,
     * triggering the callback upon completion.
     *
     * See: `prop-types.js#keypadConfigurationPropType`.
     */
    configureKeypad: function(configuration, cb) {
        store.dispatch({
            type: 'ConfigureKeypad',
            configuration,
        });

        // HACK(charlie): In Perseus, triggering a focus causes the keypad to
        // animate into view and re-configure. We'd like to provide the option
        // to re-render the re-configured keypad before animating it into view,
        // to avoid jank in the animation. As such, we support passing a
        // callback into `configureKeypad`. However, implementing this properly
        // would require middleware, etc., so we just hack it on with
        // `setTimeout` for now.
        setTimeout(() => cb && cb());
    },

    setButtonHeightPx: function(buttonHeightPx) {
        store.dispatch({
            type: 'SetButtonHeightPx',
            buttonHeightPx,
        });
    },

    setPageWidthPx: function(pageWidthPx) {
        store.dispatch({
            type: 'SetPageWidthPx',
            pageWidthPx,
        });
    },

    setKeypadCurrentPage: function(page) {
        store.dispatch({
            type: 'SetKeypadCurrentPage',
            page,
        });
    },

    removeEcho: function(animationId) {
        store.dispatch({
            type: 'RemoveEcho',
            animationId,
        });
    },

    // Input-related actions
    setKeyHandler: function(keyHandler) {
        store.dispatch({
            type: 'SetKeyHandler',
            keyHandler,
        });
    },

    setCursor: function(cursor) {
        store.dispatch({
            type: 'SetCursor',
            cursor,
        });
    },
};
