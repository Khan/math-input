const Redux = require('redux');

const GestureManager = require('../components/gesture-manager');

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

const createGestureManager = (swipeEnabled) => {
    return new GestureManager({
        swipeEnabled,
    }, {
        onSwipeChange: (dx) => {
            /* eslint-disable no-console */
            console.log("onSwipeChange:", dx);
        },
        onSwipeEnd: (dx) => {
            /* eslint-disable no-console */
            console.log("onSwipeEnd:", dx);
        },
        onActiveNodesChanged: (activeNodes) => {
            store.dispatch({
                type: 'SetActiveNodes',
                activeNodes,
            });
        },
        onClick: (id) => {
            store.dispatch({
                type: 'PressKey',
                key: id,
            });
            // TODO(charlie): Dispatch an "echo" event. These events should be
            // handled at a high level and not by the individual keypad buttons
            // as they may, for example, be removed from the DOM by the time we
            // animate the echo. We should pass down the box of the DOM node
            // here (which we can already access in the GestureManager) and use
            // it to animate the echo.
        },
    });
};

const initialGestureState = {
    popover: null,
    focus: null,
    gestureManager: createGestureManager(true),
};

const gestureReducer = function(state = initialGestureState, action) {
    switch (action.type) {
        case 'SetActiveNodes':
            return {
                ...state,
                ...action.activeNodes,
            };

        case 'ConfigureKeypad':
            const { keypadType } = action.configuration;
            const { numPages } = Keypads[keypadType];
            const swipeEnabled = numPages > 1;
            return {
                popover: null,
                focus: null,
                gestureManager: createGestureManager(swipeEnabled),
            };

        default:
            return state;
    }
};

const reducer = Redux.combineReducers({
    keypad: keypadReducer,
    buttons: buttonsReducer,
    handlers: handlersReducer,
    gestures: gestureReducer,
});

const store = Redux.createStore(reducer);

module.exports = store;
