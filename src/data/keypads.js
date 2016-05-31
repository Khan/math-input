/**
 * Data used to define the various keypads available.
 */

const Keys = require('./keys');
const { KeypadTypes } = require('../consts');

const Keypads = {
    [KeypadTypes.NUMBER]: {
        numPages: 1,
        extraKeys: [],
    },
    [KeypadTypes.FRACTION]: {
        numPages: 1,
        extraKeys: [],
    },
    [KeypadTypes.DEFAULT]: {
        numPages: 1,
        extraKeys: [],
    },
    [KeypadTypes.ADVANCED_EXPRESSION]: {
        numPages: 2,
        extraKeys: ['X', 'y', Keys.PI, Keys.THETA],
    },
    [KeypadTypes.BASIC_EXPRESSION]: {
        numPages: 2,
        extraKeys: ['X', 'Y', 'Z'],
    },
};

module.exports = Keypads;
