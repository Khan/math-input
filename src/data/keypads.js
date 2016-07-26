/**
 * Data used to define the various keypads available.
 */

const Keys = require('./keys');
const {KeypadTypes} = require('../consts');

const Keypads = {
    [KeypadTypes.FRACTION]: {
        numPages: 1,
        extraKeys: [],
    },
    [KeypadTypes.EXPRESSION]: {
        numPages: 2,
        extraKeys: ['x', 'y', Keys.PI, Keys.THETA],
    },
};

module.exports = Keypads;
