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

    configureKeypad: function(configuration) {
        store.dispatch({
            type: 'ConfigureKeypad',
            configuration,
        });
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

    resetKeypadPage: function() {
        store.dispatch({
            type: 'ResetKeypadPage',
        });
    },

    pageKeypadRight: function() {
        store.dispatch({
            type: 'PageKeypadRight',
        });
    },

    pageKeypadLeft: function() {
        store.dispatch({
            type: 'PageKeypadLeft',
        });
    },

    setKeypadCurrentPage: function(page) {
        store.dispatch({
            type: 'SetKeypadCurrentPage',
            page,
        });
    },

    pressKey: function(key) {
        store.dispatch({
            type: 'PressKey',
            key,
        });
    },

    registerKeyHandler: function(keyHandler) {
        store.dispatch({
            type: 'RegisterKeyHandler',
            keyHandler,
        });
    },

    setCursor: function(cursor) {
        store.dispatch({
            type: 'SetCursor',
            cursor,
        });
    },

    setActiveNodes: function(activeNodes) {
        store.dispatch({
            type: 'SetActiveNodes',
            activeNodes,
        });
    },

    removeEcho: function(animationId) {
        store.dispatch({
            type: 'RemoveEcho',
            animationId,
        });
    },
};
