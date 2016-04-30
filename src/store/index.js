const Redux = require('redux');

const { defaultButtonHeightPx } = require('../components/common-style');
const { keypadTypes, keyTypes } = require('../consts');
const Keys = require('../data/keys');
const KeyConfigs = require('../data/key-configs');
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
            const keyConfig = KeyConfigs[action.key];
            if (keyConfig.type !== keyTypes.KEYPAD_NAVIGATION) {
                // This is probably an anti-pattern but it works for the case
                // where we don't actually control the state but we still want
                // to communicate with the other object
                state.keyHandlers.forEach(handler => {
                    handler(keyConfig.id);
                });
            }

            // TODO(kevinb) get state from MathQuill and store it?
            return state;

        default:
            return state;
    }
};

const initialKeypadState = {
    configuration: {
        extraKeys: Keypads[keypadTypes.ADVANCED_EXPRESSION].extraKeys,
        keypadType: keypadTypes.ADVANCED_EXPRESSION,
    },
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
            // TODO(charlie): It's strange that reducer needs to be aware of
            // the number of pages. We should transition to an API that
            // requires the keypads to declare the page to which they want to
            // transition.
            const numPages = Keypads[state.configuration.keypadType].numPages;
            return {
                ...state,
                page: Math.min(state.page + 1, numPages - 1),
            };

        case 'PageKeypadLeft':
            return {
                ...state,
                page: Math.max(state.page - 1, 0),
            };

        case 'ConfigureKeypad':
            const keypadType = action.configuration.keypadType;
            return {
                ...state,
                configuration: {
                    // TODO(charlie): For now, we're hardcoding the extra
                    // symbols. However, once we've integrated with Perseus,
                    // they'll be providing both the keypad type and the extra
                    // symbols in one call; hence, they're packaged together as
                    // a single 'configuration' object.
                    extraKeys: Keypads[keypadType].extraKeys,
                    keypadType,
                },
                // Reset the page whenever the keypad is re-configured.
                page: 0,
            };

        case 'PressKey':
            const keyConfig = KeyConfigs[action.key];

            // Reset the keypad if the user performs a math operation.
            if (keyConfig.type === keyTypes.MATH ||
                    keyConfig.type === keyTypes.NUMERAL) {
                return keypadReducer(state, { type: 'ResetKeypadPage' });
            } else if (keyConfig.type === keyTypes.KEYPAD_NAVIGATION) {
                if (keyConfig.id === Keys.DISMISS) {
                    /* eslint-disable no-console */
                    console.log("TODO(charlie): Figure out dismissal.");
                    return state;
                } else if (keyConfig.id === Keys.NUMBERS) {
                    return keypadReducer(state, { type: 'ResetKeypadPage' });
                } else if (keyConfig.id === Keys.MORE) {
                    return keypadReducer(state, { type: 'PageKeypadRight' });
                }
            }
            return state;

        default:
            return state;
    }
};

const initialButtonsState = {
    buttonHeightPx: defaultButtonHeightPx,
};

const buttonsReducer = function(state = initialButtonsState, action) {
    switch (action.type) {
        case 'SetButtonHeightPx':
            return {
                ...state,
                buttonHeightPx: action.buttonHeightPx,
            };

        default:
            return state;
    }
};

const reducer = Redux.combineReducers({
    keypad: keypadReducer,
    buttons: buttonsReducer,
    handlers: handlersReducer,
});

const store = Redux.createStore(reducer);

module.exports = store;
