/**
 * This file contains a wrapper around MathQuill so that we can provide a
 * more regular interface for the functionality we need while insulating us
 * from MathQuill changes.
 */

// TODO(kevinb) allow test code to use const MathQuill = require('mathquill');
const MathQuill = window.MathQuill;
const MQ = MathQuill.getInterface(2);

const Keys = require('../data/keys');

const WRITE = 'write';
const CMD = 'cmd';
const KEYSTROKE = 'keystroke';

// A mapping from keys that can be pressed on a keypad to the way in which
// MathQuill should modify its input in response to that key-press. Any keys
// that do not provide explicit actions (like the numeral keys) will merely
// write their contents to MathQuill.
const KeyActions = {
    [Keys.PLUS]: { str: '+', fn: WRITE },
    [Keys.MINUS]: { str: '-', fn: WRITE },
    // TODO(charlie): The behavior of this key depends on the state of the
    // input. Right now, it doesn't properly respect the "switch to positive"
    // case.
    [Keys.TOGGLE_SIGN]: { str: '-', fn: WRITE },
    [Keys.TIMES]: { str: '\\times', fn: WRITE },
    [Keys.DIVIDE]: { str: '\\div', fn: WRITE },
    [Keys.DECIMAL]: { str: '.', fn: WRITE },
    [Keys.EQUAL]: { str: '=', fn: WRITE },
    [Keys.CDOT]: { str: '\\cdot', fn: WRITE },
    [Keys.FRAC]: { str: '/', fn: CMD },
    [Keys.EXP]: { str: '^', fn: CMD },
    [Keys.SQRT]: { str: 'sqrt', fn: CMD },
    [Keys.PI]: { str: 'pi', fn: CMD },
    [Keys.LEFT]: { str: 'Left', fn: KEYSTROKE },
    [Keys.RIGHT]: { str: 'Right', fn: KEYSTROKE },
    [Keys.BACKSPACE]: { str: 'Backspace', fn: KEYSTROKE },
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
            const { str, fn } = KeyActions[key];

            if (str && fn) {
                this.mathField[fn](str).focus();
            }
        } else if (/^[0-9a-z]$/.test(key)) {
            this.mathField[WRITE](key).focus();
        }
    }
}

module.exports = MathWrapper;
