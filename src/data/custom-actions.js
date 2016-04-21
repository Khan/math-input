/**
 * Custom actions for keys, which supersede dispatching the raw keystroke
 * event to the store.
 */

const Keys = require('./keys');
const actions = require('../actions');

const CustomActions = {
    [Keys.DISMISS]: () => actions.dismissKeypad(),
    [Keys.MORE]: () => actions.pageKeypadRight(),
    [Keys.NUMBERS]: () => actions.resetKeypadPage(),
};

module.exports = CustomActions;
