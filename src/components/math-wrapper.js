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
    [Keys.RADICAL]: { str: 'nthroot', fn: CMD },
    [Keys.LEFT]: { str: 'Left', fn: KEYSTROKE },
    [Keys.RIGHT]: { str: 'Right', fn: KEYSTROKE },
};

const NormalCommands = {
    [Keys.LOG]: 'log',
    [Keys.SIN]: 'sin',
    [Keys.COS]: 'cos',
    [Keys.TAN]: 'tan',
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

    _writeNormalFunction(name) {
        this.mathField.write(`\\${name}\\left(\\right)`);
        this.mathField.keystroke('Left');
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
        } else if (Object.keys(NormalCommands).includes(key)) {
            this._writeNormalFunction(NormalCommands[key]);
        } else if (key === Keys.LOG_N) {
            this.mathField.write('log_{ }\\left(\\right)');
            this.mathField.keystroke('Left'); // into parentheses
            this.mathField.keystroke('Left'); // out of parentheses
            this.mathField.keystroke('Left'); // into index
        } else if (key === Keys.BACKSPACE) {
            this._handleBackspace(cursor);
        } else if (/^[0-9a-z]$/.test(key)) {
            this.mathField[WRITE](key).focus();
        }

        if (!cursor.selection) {  // don't show the cursor for selections
            cursor.show();
        }
    }

    // Notes about MathQuill
    //
    // MathQuill's stores its layout as nested linked lists.  Each node in the
    // list has MQ.L '-1' and MQ.R '1' properties that define links to the
    // left and right nodes respectively.  They also have 'parent', 'ctrlSeq',
    // 'ends', and a bunch of other properties we don't care about. The
    // 'ctrlSeq' property contains the latex code snippet that defines that
    // node.
    //
    // All of the code below is super fragile.  Please be especially careful
    // when upgrading MathQuill.

    /**
     * Return the start node of the command to the left of `\\left(` or null
     * if there is no command.
     *
     * @param {node} leftParenNode - node where .ctrlSeq == `\\left(`
     * @returns {node} - null or the first node in the command
     * @private
     */
    _maybeFindCommand(leftParenNode) {
        let node = leftParenNode;

        // MathQuill stores commands as separate characters so that
        // users can delete commands one character at a time.  Iterate over
        // the nodes from right to left until we hit a '\\' signifies the
        // start of a command and return that node.  If we encounter any
        // character that doesn't belong in a command, return null.

        const commandDelimiter = '\\';

        // We match a single character at a time.  The '\\' is optional because
        // only the first node in the sequence contains a '\\', e.g.
        // ['\\l', 'o', 'g ', '\\left(', ...]
        const commandCharRegex = /[\\]?[a-z]/;

        while (node[MQ.L] !== 0) {
            node = node[MQ.L];
            if (commandCharRegex.test(node.ctrlSeq)) {
                if (node.ctrlSeq.startsWith(commandDelimiter)) {
                    return node;
                } else {
                    continue;
                }
            } else {
                return null;
            }
        }

        return null;
    }

    /**
     * Selects and deletes part of the expression based on the cursor location.
     * See inline comments for precise behavior of different cases.
     *
     * @param {cursor} cursor
     * @private
     */
    _handleBackspace(cursor) {
        const MQ_END = 0;

        if (!cursor.selection) {
            const rightNode = cursor[MQ.R];
            const leftNode = cursor[MQ.L];

            // TODO(kevinb): handle square brackets, braces, etc.
            if (leftNode.ctrlSeq === '\\left(' &&
                    rightNode.ctrlSeq === '\\right)') {
                // handle deleting an empty set of parens
                // (|) => |
                this.mathField.keystroke('Right');
                this.mathField.keystroke('Backspace');
                this.mathField.keystroke('Backspace');
                cursor.show();
                return;
            } else if (leftNode.ctrlSeq === '\\left(') {
                // In this case the node with '\\left(' for its ctrlSeq
                // is the parent of the expression contained within the
                // parentheses.
                //
                // Handle selecting an expression before deleting:
                // (x+1)| => |(x+1)|
                // \log(x+1)| => |\log(x+1)|

                const command = this._maybeFindCommand(leftNode);

                if (command) {
                    // there's a command before the parens so we select it
                    // as well as the parens
                    cursor.insLeftOf(command);
                    cursor.startSelection();
                    if (rightNode === MQ_END) {
                        cursor.insAtRightEnd(cursor.parent);
                    } else {
                        cursor.insLeftOf(rightNode);
                    }
                    cursor.select();
                    cursor.endSelection();
                } else {
                    cursor.startSelection();
                    cursor.insLeftOf(leftNode); // left of \\left(
                    cursor.select();
                    cursor.endSelection();
                }

                return;
            } else if (cursor.parent.parent.ctrlSeq === '\\left(') {
                // Handle situations when the cursor is inside parens or a
                // command that uses parens, e.g. \log() or \tan()
                //
                // MathQuill represents log(x+1) in roughly the following way
                // [l, o, g, \\left[parent:[x, +, 1]]]
                //
                // If the cursor is inside the parentheses it's next to one of:
                // x, +, or 1.  This makes sub_sub_expr its parent and sub_expr
                // it's parent.
                //
                // Interestingly parent doesn't have any nodes to the left or
                // right of it (even though the corresponding DOM node has
                // ( and ) characters on either side.
                //
                // The grandparent's ctrlSeq is `\\left(`. The `\\right)` isn't
                // stored anywhere.  NOTE(kevinb): I believe this is because
                // MathQuill knows what the close paren should be and does the
                // right thing at render time.
                //
                // This conditional branch handles the following cases:
                // - \log(x+1|) => \log(x+|)
                // - \log(|x+1) => |\log(x+1)|
                // - \log(|) => |

                if (cursor[MQ.L] !== MQ_END) {
                    // This command contains math and there's some math to
                    // the left of the cursor that we should delete normally
                    // before doing anything special.
                    this.mathField.keystroke('Backspace');
                    return;
                }

                // Determine if the parens are empty before we modify the
                // cursor's position.
                const isEmpty = cursor[MQ.L] === MQ_END &&
                    cursor[MQ.R] === MQ_END;

                const grandparent = cursor.parent.parent;

                // Insert the cursor to the left of the command if there is one
                // or before the '\\left(` if there isn't
                cursor.insLeftOf(
                    this._maybeFindCommand(grandparent) || grandparent);
                cursor.startSelection();

                if (grandparent[MQ.R] !== MQ_END) {
                    // There is something to the right of the grandparent we
                    // place the cursor on the left side of the item that's to
                    // the right, e.g. \\log\\left(x+1\\right)|+1
                    cursor.insLeftOf(grandparent[MQ.R]);
                } else {
                    // The end of the command is at the end of the latex so
                    // we move the cursor to the end of everything.
                    cursor.insRightOf(grandparent);
                }
                cursor.select();
                cursor.endSelection();

                // Delete the selection, but only if the parens were empty to
                // begin with.
                if (isEmpty) {
                    this.mathField.keystroke('Backspace');
                }
            } else {
                this.mathField.keystroke('Backspace');
            }
        } else {
            this.mathField.keystroke('Backspace');
        }
    }
}

module.exports = MathWrapper;
