/**
 * This file contains a wrapper around MathQuill so that we can provide a
 * more regular interface for the functionality we need while insulating us
 * from MathQuill changes.
 */

const MathQuill = require('mathquill');
const MQ = MathQuill.getInterface(2);

const Keys = require('./keys');

const WRITE = 'write';
const CMD = 'cmd';
const KEYSTROKE = 'keystroke';

const KeyActions = {
    [Keys.PLUS]: { key: '+', fn: WRITE },
    [Keys.MINUS]: { key: '-', fn: WRITE },
    [Keys.TIMES]: { key: '\\times', fn: WRITE },
    [Keys.DIVIDE]: { key: '\\div', fn: WRITE },
    [Keys.DECIMAL]: { key: '.', fn: WRITE },
    [Keys.EQUAL]: { key: '=', fn: WRITE },
    [Keys.CDOT]: { key: '\\cdot', fn: WRITE },
    [Keys.FRAC]: { key: '/', fn: CMD },
    [Keys.EXP]: { key: '^', fn: CMD },
    [Keys.SQRT]: { key: 'sqrt', fn: CMD },
    [Keys.LEFT]: { key: 'Left', fn: KEYSTROKE },
    [Keys.RIGHT]: { key: 'Right', fn: KEYSTROKE },
    [Keys.BACKSPACE]: { key: 'Backspace', fn: KEYSTROKE },
};

class MathWrapper {

    constructor(element) {
        const options = {
            // use a span instead of a textarea so that we don't bring up the
            // native keyboard on mobile when selecting the input
            substituteTextarea: function() {
                return document.createElement('span');
            },
        };

        this.mathField = MQ.MathField(element, options);
    }

    pressKey(key) {
        if (key in KeyActions) {
            const { key: mqKey, fn } = KeyActions[key];

            if (mqKey && fn) {
                this.mathField[fn](mqKey).focus();
            }
        } else if (/^[0-9a-z]$/.test(key)) {
            this.mathField[WRITE](key);
        }
    }
}

module.exports = MathWrapper;
