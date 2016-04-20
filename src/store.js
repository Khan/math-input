const Redux = require('redux');

const initialState = {
    currentValue: '',
    keyHandlers: [],    // TODO(kevinb) keep track of the current handle
};

const reducer = function(state = initialState, action) {

    switch(action.type) {
        case 'RegisterInput':
            return {
                ...state,
                keyHandlers: [...state.keyHandlers, action.keyHandler],
            };

            return state;
        case 'KeyPress':

            // This is probably an anti-pattern but it works for the case where
            // we don't actually control the state but we still want to
            // communicate with the other object
            state.keyHandlers.forEach(handler => {
                handler(action.key);
            });

            // TODO(kevinb) have the handler return state from MathQuill and store it

            return state;
        default:
            return state;
    }
};


const store = Redux.createStore(reducer);

module.exports = store;
