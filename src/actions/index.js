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

    setKeypadType: function(keypadType) {
        store.dispatch({
            type: 'SetKeypadType',
            keypadType,
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

    pressKey: function(key, keyType) {
        store.dispatch({
            type: 'PressKey',
            key,
            keyType,
        });
    },

    registerKeyHandler: function(keyHandler) {
        store.dispatch({
            type: 'RegisterKeyHandler',
            keyHandler,
        });
    },
};
