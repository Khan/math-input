const store = require('./store');

module.exports = {
    // naming convetion: verb + noun
    // the noun should be one of the other properties in the object that's
    // being dispatched

    pressKey: function(key) {
        store.dispatch({
            type: 'PressKey',
            key: key,
        });
    },

    registerKeyHandler: function(keyHandler) {
        store.dispatch({
            type: 'RegisterKeyHandler',
            keyHandler: keyHandler,
        });
    },
};
