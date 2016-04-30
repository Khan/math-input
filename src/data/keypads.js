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
        extraKeys: ['x', Keys.PI, 'y', 'e', 'z'],
    },
    [keypadTypes.BASIC_EXPRESSION]: {
        numPages: 2,
        extraKeys: ['x', Keys.PI, 'y', 'e', 'z'],
    },
    [keypadTypes.TEST_POPOVER]: {
        numPages: 1,
        extraKeys: [],
    },
};

module.exports = Keypads;
