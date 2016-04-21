const Redux = require('redux');

const { keypadTypes, keyTypes } = require('../consts');
const Keypads = require('../data/keypads');

const initialHandlersState = {
    keyHandlers: [],    // TODO(kevinb) keep track of the current handle
};

const handlersReducer = function(state = initialHandlersState, action) {
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
                handler(action.key);
            });

            // TODO(kevinb) get state from MathQuill and store it?
            return state;

        default:
            return state;
    }
};

const initialKeypadState = {
    type: keypadTypes.FRACTION,
    page: 0,
};

const keypadReducer = function(state = initialKeypadState, action) {
    switch (action.type) {
        case 'DismissKeypad':
            /* eslint-disable no-console */
            console.log("TODO(charlie): Figure out dismissal.");
            return state;

        case 'ResetKeypadPage':
            return {
                ...state,
                page: 0,
            };

        case 'PageKeypadRight':
            const numPages = Keypads[state.type].numPages;
            return {
                ...state,
                page: Math.min(state.page + 1, numPages - 1),
            };

        case 'PageKeypadLeft':
            return {
                ...state,
                page: Math.max(state.page - 1, 0),
            };

        case 'SetKeypadType':
            return {
                ...state,
                type: action.keypadType,
            };

        case 'PressKey':
            // Reset the keypad if the user performs a math operation.
            if (action.keyType === keyTypes.MATH && state.page > 0) {
                return keypadReducer(state, { type: 'ResetKeypadPage' });
            }
            return state;

        default:
            return state;
    }
};

const reducer = Redux.combineReducers({
    keypad: keypadReducer,
    handlers: handlersReducer,
});

const store = Redux.createStore(reducer);

module.exports = store;
