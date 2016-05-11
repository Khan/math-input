/**
 * Data used to define the various keypads available.
 */

const Keys = require('./keys');
const { keypadTypes } = require('../consts');

const Keypads = {
    [keypadTypes.NUMBER]: {
        numPages: 1,
        extraKeys: [],
    },
    [keypadTypes.FRACTION]: {
        numPages: 1,
        extraKeys: [],
    },
    [keypadTypes.DEFAULT]: {
        numPages: 1,
        extraKeys: [],
    },
    [keypadTypes.ADVANCED_EXPRESSION]: {
        numPages: 2,
        extraKeys: ['X', 'Y', Keys.PI, Keys.THETA],
    },
    [keypadTypes.BASIC_EXPRESSION]: {
        numPages: 2,
        extraKeys: [],
    },
};

module.exports = Keypads;
