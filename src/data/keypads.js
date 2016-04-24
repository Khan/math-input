/**
 * Data used to define the various keypads available.
 */

const { keypadTypes } = require('../consts');

const Keypads = {
    [keypadTypes.NUMBER]: {
        numPages: 1,
        extraSymbols: [],
    },
    [keypadTypes.FRACTION]: {
        numPages: 1,
        extraSymbols: [],
    },
    [keypadTypes.DEFAULT]: {
        numPages: 1,
        extraSymbols: [],
    },
    [keypadTypes.TEST_MULTI_BUTTON]: {
        numPages: 1,
        extraSymbols: [],
    },
    [keypadTypes.TEST_MULTI_PAGE]: {
        numPages: 2,
        extraSymbols: [],
    },
    [keypadTypes.TEST_POPOVER]: {
        numPages: 1,
        extraSymbols: [],
    },
    [keypadTypes.TEST_MULTI_SYMBOL]: {
        numPages: 1,
        extraSymbols: ['x', 'PI', 'y', 'e', 'z'],
    },
};

module.exports = Keypads;
