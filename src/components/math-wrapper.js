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
        const cursor = this.mathField.__controller.cursor;

        if (key in KeyActions) {
            const {str, fn} = KeyActions[key];

            if (str && fn) {
                this.mathField[fn](str).focus();
            }
        } else if (key === Keys.PARENS) {
            this.mathField.write('\\left(\\right)');
            this.mathField.keystroke('Left');
        } else if (key === Keys.BACKSPACE) {
            if (!cursor.selection) {
                const leftSeq = cursor[-1].ctrlSeq;
                const rightSeq = cursor[1].ctrlSeq;

                if (leftSeq === '\\left(' && rightSeq === '\\right)') {
                    // Handle deleting an empty set of parens:
                    // (|) => |
                    this.mathField.keystroke('Right');
                    this.mathField.keystroke('Backspace');
                    this.mathField.keystroke('Backspace');
                    cursor.show();
                    return;
                } else if (leftSeq === '\\left(') {
                    // In this case the node with '\\left(' for its ctrlSeq
                    // is the parent of the expression contained within the
                    // parentheses.
                    //
                    // Handle selecting an expression before deleting:
                    // (x+1)| => |(x+1)|
                    cursor.startSelection();
                    cursor.insLeftOf(cursor[-1]);
                    cursor.select();
                    cursor.endSelection();
                    return;
                }
            }

            // fall through
            this.mathField.keystroke('Backspace');
        } else if (/^[0-9a-z]$/.test(key)) {
            this.mathField[WRITE](key).focus();
        }

        cursor.show();
    }
}

module.exports = MathWrapper;
