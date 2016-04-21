/**
 * Data used to define the various keypads available.
 */

const { keypadTypes } = require('../consts');

const Keypads = {
    [keypadTypes.NUMBER]: {
        numPages: 1,
    },
    [keypadTypes.FRACTION]: {
        numPages: 1,
    },
    [keypadTypes.DEFAULT]: {
        numPages: 1,
    },
    [keypadTypes.TEST_MULTI_BUTTON]: {
        numPages: 1,
    },
    [keypadTypes.TEST_MULTI_PAGE]: {
        numPages: 2,
    },
};

module.exports = Keypads;
