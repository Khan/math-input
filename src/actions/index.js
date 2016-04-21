const store = require('../store');

module.exports = {
    // naming convetion: verb + noun
    // the noun should be one of the other properties in the object that's
    // being dispatched
    setKeypadType: function(keypadType) {
        store.dispatch({
            type: 'SetKeypadType',
            keypadType,
        });
    },

    pressKey: function(key, cmd = false) {
        store.dispatch({
            type: 'PressKey',
            key,
            cmd,
        });
    },

    registerKeyHandler: function(keyHandler) {
        store.dispatch({
            type: 'RegisterKeyHandler',
            keyHandler,
        });
    },
};
