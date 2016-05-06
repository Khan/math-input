/**
 * This file contains a wrapper around MathQuill so that we can provide a
 * more regular interface for the functionality we need while insulating us
 * from MathQuill changes.
 */

const $ = require('jQuery');
// TODO(kevinb) allow test code to use const MathQuill = require('mathquill');
const MathQuill = window.MathQuill;
const MQ = MathQuill.getInterface(2);

const Keys = require('../../data/keys');
const CursorContexts = require('./cursor-contexts');

const WRITE = 'write';
const CMD = 'cmd';
const KEYSTROKE = 'keystroke';
const MQ_END = 0;

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
    [Keys.NEQ]: { str: '\\neq', fn: WRITE },
    [Keys.CDOT]: { str: '\\cdot', fn: WRITE },
    [Keys.PERCENT]: { str: '%', fn: WRITE },
    [Keys.FRAC]: { str: '/', fn: CMD },
    [Keys.EXP]: { str: '^', fn: CMD },
    [Keys.EXP_2]: { str: '^2', fn: WRITE },
    [Keys.EXP_3]: { str: '^3', fn: WRITE },
    [Keys.SQRT]: { str: 'sqrt', fn: CMD },
    [Keys.PI]: { str: 'pi', fn: CMD },
    [Keys.RADICAL]: { str: 'nthroot', fn: CMD },
    [Keys.LEFT]: { str: 'Left', fn: KEYSTROKE },
    [Keys.RIGHT]: { str: 'Right', fn: KEYSTROKE },
    [Keys.JUMP_OUT]: { str: 'Right', fn: KEYSTROKE },
    [Keys.LT]: { str: '<', fn: WRITE },
    [Keys.LEQ]: { str: '\\leq', fn: WRITE },
    [Keys.GT]: { str: '>', fn: WRITE },
    [Keys.GEQ]: { str: '\\geq', fn: WRITE },
};

const NormalCommands = {
    [Keys.LOG]: 'log',
    [Keys.LN]: 'ln',
    [Keys.SIN]: 'sin',
    [Keys.COS]: 'cos',
    [Keys.TAN]: 'tan',
};

class MathWrapper {

    constructor(element, callbacks = {}) {
        const options = {
            // use a span instead of a textarea so that we don't bring up the
            // native keyboard on mobile when selecting the input
            substituteTextarea: function() {
                return document.createElement('span');
            },
        };

        this.mathField = MQ.MathField(element, options);
        this.callbacks = callbacks;
    }

    _writeNormalFunction(name) {
        this.mathField.write(`\\${name}\\left(\\right)`);
        this.mathField.keystroke('Left');
    }

    /**
     * Handle a key press and return the resulting cursor state.
     *
     * @param {Key} key - an enum representing the key that was pressed
     * @returns {object} a cursor object, consisting of a cursor context
     */
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
        } else if (key === Keys.CUBE_ROOT) {
            this.mathField.write('\\sqrt[3]{}');
            this.mathField.keystroke('Left'); // under the root
        } else if (key === Keys.BACKSPACE) {
            this._handleBackspace(cursor);
        } else if (/^[a-z]$/.test(key)) {
            this.mathField[WRITE](key).focus();
        } else if (/^NUM_\d/.test(key)) {
            this.mathField[WRITE](key[4]).focus();
        }

        if (!cursor.selection) {  // don't show the cursor for selections
            cursor.show();
        }

        if (this.callbacks.onSelectionChanged) {
            this.callbacks.onSelectionChanged(cursor.selection);
        }

        // NOTE(charlie): It's insufficient to do this as an `edited` handler
        // on the MathField, as that handler isn't triggered on navigation
        // events.
        return {
            context: this._contextForCursor(cursor),
        };
    }

    setCursorPosition(x, y, hitNode) {
        const el = hitNode || document.elementFromPoint(x, y);

        if (el) {
            const cursor = this.getCursor();

            if (el.hasAttribute('mq-root-block')) {
                // If we're in the empty area place the cursor at the right
                // end of the expression.
                cursor.insAtRightEnd(this.mathField.__controller.root);
            } else {
                // Otherwise place beside the element at x, y.
                const controller = this.mathField.__controller;
                controller.seek($(el), x, y).cursor.startSelection();
            }

            if (this.callbacks.onCursorMove) {
                this.callbacks.onCursorMove({
                    context: this._contextForCursor(cursor),
                });
            }
        }
    }

    getCursor() {
        return this.mathField.__controller.cursor;
    }

    getSelection() {
        return this.getCursor().selection;
    }

    getLatex() {
        return this.mathField.latex();
    }

    // Notes about MathQuill
    //
    // MathQuill's stores its layout as nested linked lists.  Each node in the
    // list has MQ.L '-1' and MQ.R '1' properties that define links to the
    // left and right nodes respectively.  They also have
    //
    // ctrlSeq: contains the latex code snippet that defines that node.
    // jQ: jQuery object for the DOM node(s) for this MathQuill node.
    // ends: pointers to the nodes at the ends of the container.
    // parent: parent node.
    // blocks: an array containing one or more nodes that make up the node.
    // sub?: subscript node if there is one as is the case in log_n
    //
    // All of the code below is super fragile.  Please be especially careful
    // when upgrading MathQuill.

    /**
     * Selects and deletes part of the expression based on the cursor location.
     * See inline comments for precise behavior of different cases.
     *
     * @param {cursor} cursor
     * @private
     */
    _handleBackspace(cursor) {
        if (!cursor.selection) {
            const parent = cursor.parent;
            const grandparent = parent.parent;
            const leftNode = cursor[MQ.L];

            if (this._isFraction(leftNode)) {
                this._selectNode(leftNode, cursor);

            } else if (this._isSquareRoot(leftNode)) {
                this._selectNode(leftNode, cursor);

            } else if (this._isNthRoot(leftNode)) {
                this._selectNode(leftNode, cursor);

            } else if (this._isNthRootIndex(parent)) {
                this._handleBackspaceInRootIndex(cursor);

            } else if (this._isInsideEmptyParens(cursor)) {
                this._handleBackspaceInEmptyParens(cursor);

            } else if (leftNode.ctrlSeq === '\\left(') {
                this._handleBackspaceOutsideParens(cursor);

            } else if (grandparent.ctrlSeq === '\\left(') {
                this._handleBackspaceInsideParens(cursor);

            } else if (this._isInsideLogIndex(cursor)) {
                this._handleBackspaceInLogIndex(cursor);

            } else {
                this.mathField.keystroke('Backspace');
            }
        } else {
            this.mathField.keystroke('Backspace');
        }
    }

    /**
     * Return the start node of the command to the left of `\\left(` or null
     * if there is no command.
     *
     * @param {node} leftParenNode - node where .ctrlSeq == `\\left(`
     * @returns {null|node} - null or the first node in the command
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

        let name = '';

        while (node[MQ.L] !== 0) {
            node = node[MQ.L];
            if (commandCharRegex.test(node.ctrlSeq)) {
                name = node.ctrlSeq.trim() + name;

                if (node.ctrlSeq.startsWith(commandDelimiter)) {
                    return { name, node };
                } else {
                    continue;
                }
            } else {
                return { name: null, node: null };
            }
        }

        return { name: null, node: null };
    }

    _selectNode(node, cursor) {
        cursor.insLeftOf(node);
        cursor.startSelection();
        cursor.insRightOf(node);
        cursor.select();
        cursor.endSelection();
    }

    _isFraction(node) {
        return node.jQ && node.jQ.hasClass('mq-fraction');
    }

    _isSquareRoot(node) {
        return node.blocks && node.blocks[0].jQ &&
            node.blocks[0].jQ.hasClass('mq-sqrt-stem');
    }

    _isNthRoot(node) {
        return node.blocks && node.blocks[0].jQ &&
            node.blocks[0].jQ.hasClass('mq-nthroot');
    }

    _isNthRootIndex(node) {
        return node.jQ && node.jQ.hasClass('mq-nthroot');
    }

    _isInsideLogIndex(cursor) {
        const grandparent = cursor.parent.parent;

        if (grandparent && grandparent.jQ.hasClass('mq-supsub')) {
            const command = this._maybeFindCommand(grandparent);

            if (command.name === '\\log') {
                return true;
            }
        }

        return false;
    }

    _isInsideEmptyParens(cursor) {
        return cursor[MQ.L].ctrlSeq === '\\left(' &&
            cursor[MQ.R].ctrlSeq === '\\right)';
    }

    _isInsideEmptyNode(cursor) {
        return cursor[MQ.L] === MQ_END && cursor[MQ.R] === MQ_END;
    }

    _handleBackspaceInEmptyParens(cursor) {
        // handle deleting an empty set of parens
        // (|) => |
        this.mathField.keystroke('Right');
        this.mathField.keystroke('Backspace');
        this.mathField.keystroke('Backspace');
        cursor.show();
    }

    _handleBackspaceInRootIndex(cursor) {
        if (this._isInsideEmptyNode(cursor)) {
            // When deleting the index in a nthroot, we change from the nthroot
            // to a sqrt, e.g. \sqrt[|]{35x-5} => |\sqrt{35x-5}.  If there's no
            // content under the root, then we delete the whole thing.

            const grandparent = cursor.parent.parent;
            const latex = grandparent.latex();
            const reinsertionPoint = grandparent[MQ.L];

            this._selectNode(grandparent, cursor);

            const rootIsEmpty = grandparent.blocks[1].jQ.text() === '';

            if (rootIsEmpty) {
                // If there is not content under the root then simply delete
                // the whole thing.
                this.mathField.keystroke('Backspace');
            } else {
                // Replace the nthroot with a sqrt if there was content under
                // the root.

                // Start by deleting the selection.
                this.mathField.keystroke('Backspace');

                // Replace the nth-root with a sqrt.
                this.mathField.write(
                    latex.replace(/^\\sqrt\[\]/, '\\sqrt'));

                // Adjust the cursor to be to the left the sqrt.
                if (reinsertionPoint === MQ_END) {
                    this.mathField.moveToDirEnd(MQ.L);
                } else {
                    cursor.insRightOf(reinsertionPoint);
                }
            }
        } else {
            if (cursor[MQ.L] !== MQ_END) {
                // If the cursor is not at the leftmost position inside the
                // root's index, delete a character.
                this.mathField.keystroke('Backspace');
            } else {
                // TODO(kevinb) verify that we want this behavior after testing
                // Do nothing because we haven't completely deleted the
                // index of the radical.
            }
        }
    }

    _handleBackspaceInLogIndex(cursor) {
        if (this._isInsideEmptyNode(cursor)) {
            const grandparent = cursor.parent.parent;
            const command = this._maybeFindCommand(grandparent);

            cursor.insLeftOf(command.node);
            cursor.startSelection();

            if (grandparent[MQ.R] !== MQ_END) {
                cursor.insRightOf(grandparent[MQ.R]);
            } else {
                cursor.insRightOf(grandparent);
            }

            cursor.select();
            cursor.endSelection();

            const isLogBodyEmpty = grandparent[MQ.R].contentjQ.text() === '';

            if (isLogBodyEmpty) {
                // If there's no content inside the log's parens then delete the
                // whole thing.
                this.mathField.keystroke('Backspace');
            }
        } else {
            this.mathField.keystroke('Backspace');
        }
    }

    _handleBackspaceOutsideParens(cursor) {
        // In this case the node with '\\left(' for its ctrlSeq
        // is the parent of the expression contained within the
        // parentheses.
        //
        // Handle selecting an expression before deleting:
        // (x+1)| => |(x+1)|
        // \log(x+1)| => |\log(x+1)|

        const leftNode = cursor[MQ.L];
        const rightNode = cursor[MQ.R];
        const command = this._maybeFindCommand(leftNode);

        if (command.node) {
            // There's a command before the parens so we select it as well as
            // the parens.
            cursor.insLeftOf(command.node);
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
    }

    _handleBackspaceInsideParens(cursor) {
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

        const grandparent = cursor.parent.parent;

        // If the cursors is inside the parens at the start but the command
        // has a subscript as is the case in log_n then move the cursor into
        // the subscript, e.g. \log_{5}(|x+1) => \log_{5|}(x+1)

        if (grandparent[MQ.L].sub) {    // if there is a subscript
            if (grandparent[MQ.L].sub.jQ.text()) {    // and it contains text
                // move the cursor to the right end of the subscript
                cursor.insAtRightEnd(grandparent[MQ.L].sub);
                return;
            }
        }

        // Determine if the parens are empty before we modify the
        // cursor's position.
        const isEmpty = this._isInsideEmptyNode(cursor);

        // Insert the cursor to the left of the command if there is one
        // or before the '\\left(` if there isn't
        const command = this._maybeFindCommand(grandparent);
        cursor.insLeftOf(command.node || grandparent);
        cursor.startSelection();
        cursor.insRightOf(grandparent);
        cursor.select();
        cursor.endSelection();

        // Delete the selection, but only if the parens were empty to
        // begin with.
        if (isEmpty) {
            this.mathField.keystroke('Backspace');
        }
    }

    _contextForCursor(cursor) {
        if (this._isAtTopLevel(cursor)) {
            return CursorContexts.TOP_LEVEL;
        } else {
            return CursorContexts.NESTED;
        }
    }

    _isAtTopLevel(cursor) {
        return !cursor.parent.parent;
    }
}

module.exports = MathWrapper;
