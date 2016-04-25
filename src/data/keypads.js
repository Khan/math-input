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
    [keypadTypes.ADVANCED_EXPRESSION]: {
        numPages: 2,
        extraSymbols: ['x', 'PI', 'y', 'e', 'z'],
    },
    [keypadTypes.TEST_POPOVER]: {
        numPages: 1,
        extraSymbols: [],
    },
};

module.exports = Keypads;
