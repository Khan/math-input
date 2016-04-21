const Redux = require('redux');

const initialState = {
    currentValue: '',
    keyHandlers: [],    // TODO(kevinb) keep track of the current handle
};

const reducer = function(state = initialState, action) {

    switch (action.type) {
        case 'RegisterKeyHandler':
            return {
                ...state,
                keyHandlers: [...state.keyHandlers, action.keyHandler],
            };

        case 'PressKey':
            // This is probably an anti-pattern but it works for the case where
            // we don't actually control the state but we still want to
            // communicate with the other object
            state.keyHandlers.forEach(handler => {
                handler(action.key, action.cmd);
            });

            // TODO(kevinb) get state from MathQuill and store it?
            return state;

        default:
            return state;
    }
};


const store = Redux.createStore(reducer);

module.exports = store;
