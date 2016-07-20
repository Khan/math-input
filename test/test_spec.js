/* eslint-env node, mocha */
require('babel-polyfill');
const jsdom = require('jsdom');
const assert = require('assert');

const Keys = require('../src/data/keys');

const MQ = {L: '-1', R: '1'};
const END_OF_EXPR = 0;

const createMathField = (document, MathWrapper) => {
    const span = document.createElement('span');
    document.body.appendChild(span);

    return new MathWrapper(span);
};

const isInsideEmptyParens = (cursor) => {
    return cursor[MQ.L] === END_OF_EXPR && cursor[MQ.R] === END_OF_EXPR &&
        cursor.parent.parent.ctrlSeq === '\\left(';
};

describe('MathQuill', () => {
    let document;
    let MathWrapper;
    let loaded;
    let mathField;

    beforeEach((done) => {
        if (loaded) {
            mathField = createMathField(document, MathWrapper);

            done();
        } else {
            jsdom.env({
                html: '<html><body></body></html>',
                scripts: [
                    // jQuery is hard dep of MathQuill
                    'http://code.jquery.com/jquery.js',
                    'mathquill/mathquill.js',
                ],
                done: function(err, win) {
                    document = win.document;
                    global.window = win;
                    global.document = document;

                    MathWrapper = require('./test-math-wrapper');
                    mathField = createMathField(document, MathWrapper);

                    loaded = true;
                    done();
                },
            });
        }
    });

    afterEach((done) => {
        done();
    });

    // TODO(charlie): Add tests for Keys.FRAC_EXCLUSIVE (the mixed-number
    // fraction key).
    describe('Fraction Bar', () => {
        it('should work with no content', () => {
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            assert.equal(mathField.getContent(), '\\frac{ }{ }');
        });

        it('should work after an expression', () => {
            mathField.setContent('35x^2');
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            assert.equal(mathField.getContent(), '\\frac{35x^2}{ }');
        });

        it('should work before an expression', () => {
            mathField.setContent('35x^2');
            mathField.moveToStart();
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            assert.equal(mathField.getContent(), '\\frac{ }{ }35x^2');
        });

        it('should work with a selected expression', () => {
            mathField.setContent('35x^2');
            mathField.selectAll();
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            assert.equal(mathField.getContent(), '\\frac{35x^2}{ }');
        });
    });

    describe('Parentheses', () => {
        it('should work with no content', () => {
            mathField.setContent('');
            mathField.pressKey(Keys.LEFT_PAREN);
            assert.equal(mathField.getContent(), '\\left(\\right)');
        });

        it('should work after an expression', () => {
            mathField.setContent('35x^2');
            mathField.pressKey(Keys.RIGHT_PAREN);
            assert.equal(mathField.getContent(), '\\left(35x^2\\right)');
        });

        it('should work before an expression', () => {
            mathField.setContent('35x^2');
            mathField.moveToStart();
            mathField.pressKey(Keys.LEFT_PAREN);
            assert.equal(mathField.getContent(), '\\left(35x^2\\right)');
        });

        it.skip('should work on a selected expression', () => {
            mathField.setContent('35x + 5');
            mathField.selectAll();
            mathField.pressKey(Keys.LEFT_PAREN);
            assert.equal(mathField.getContent(), '\\left(35x^2\\right)');
        });
    });

    describe('Squared', () => {
        it('should prefix with empty parens after no content', () => {
            mathField.pressKey(Keys.EXP_2);
            assert.equal(mathField.getContent(), '\\left(\\right)^2');

            // Verify that the cursor is in parens.
            assert(isInsideEmptyParens(mathField.getCursor()));
        });

        it('should prefix with empty parens after an operator', () => {
            mathField.pressKey(Keys.DIVIDE);
            mathField.pressKey(Keys.EXP_2);
            assert.equal(mathField.getContent(), '\\div\\left(\\right)^2');
        });

        it('should work after an expression', () => {
            mathField.setContent('35x');
            mathField.pressKey(Keys.EXP_2);
            assert.equal(mathField.getContent(), '35x^2');
        });

        it.skip('should work on a selected expression', () => {
            mathField.setContent('35x+5');
            mathField.selectAll();
            mathField.pressKey(Keys.EXP_2);
            assert.equal(mathField.getContent(), '\\left(35x+5\\right)^2');
        });
    });

    describe('Cubed', () => {
        it('should prefix with empty parens after no content', () => {
            mathField.pressKey(Keys.EXP_3);
            assert.equal(mathField.getContent(), '\\left(\\right)^3');

            // Verify that the cursor is in parens.
            assert(isInsideEmptyParens(mathField.getCursor()));
        });

        it('should prefix with empty parens after an operator', () => {
            mathField.pressKey(Keys.EQUAL);
            mathField.pressKey(Keys.EXP_3);
            assert.equal(mathField.getContent(), '=\\left(\\right)^3');
        });

        it('should work after an expression', () => {
            mathField.setContent('35x');
            mathField.pressKey(Keys.EXP_3);
            assert.equal(mathField.getContent(), '35x^3');
        });

        it.skip('should work on a selected expression', () => {
            mathField.setContent('35x+5');
            mathField.selectAll();
            mathField.pressKey(Keys.EXP_3);
            assert.equal(mathField.getContent(), '\\left(35x+5\\right)^3');
        });
    });

    describe('Exponent', () => {
        it('should prefix with empty parens after no content', () => {
            mathField.pressKey(Keys.EXP);
            assert.equal(mathField.getContent(), '\\left(\\right)^{ }');

            // Verify that the cursor is in the exponent, not within the parens,
            // writing a unique character to verify cursor position.
            assert(!isInsideEmptyParens(mathField.getCursor()));
            mathField.pressKey(Keys.PLUS);
            assert.equal(mathField.getContent(), '\\left(\\right)^+');
        });

        it('should prefix with empty parens after an operator', () => {
            mathField.pressKey(Keys.PLUS);
            mathField.pressKey(Keys.EXP);
            assert.equal(mathField.getContent(), '+\\left(\\right)^{ }');
        });

        it('should work after an expression', () => {
            mathField.setContent('35x');
            mathField.pressKey(Keys.EXP);
            assert.equal(mathField.getContent(), '35x^{ }');
        });

        // TODO(kevinb): makes the expression an exponent when it shouldn't
        it.skip('should work on a selected expression', () => {
            mathField.setContent('35x+5');
            mathField.selectAll();
            mathField.pressKey(Keys.EXP);
            assert.equal(mathField.getContent(), '\\left(35x+5\\right)^{ }');
        });
    });

    describe('Square Root', () => {
        it('should work with no content', () => {
            mathField.pressKey(Keys.SQRT);
            assert.equal(mathField.getContent(), '\\sqrt{ }');
        });

        it('should work after an expression', () => {
            mathField.setContent('35x^2');
            mathField.pressKey(Keys.SQRT);
            assert.equal(mathField.getContent(), '35x^2\\sqrt{ }');
        });

        it('should work on a selected expression', () => {
            mathField.setContent('35x+5');
            mathField.selectAll();
            mathField.pressKey(Keys.SQRT);
            assert.equal(mathField.getContent(), '\\sqrt{35x+5}');
        });
    });

    describe('Radical', () => {
        it('should work with no content', () => {
            mathField.pressKey(Keys.RADICAL);
            assert.equal(mathField.getContent(), '\\sqrt[]{}');
        });

        it('should work after an expression', () => {
            mathField.setContent('35x^2');
            mathField.pressKey(Keys.RADICAL);
            assert.equal(mathField.getContent(), '35x^2\\sqrt[]{}');
        });

        it.skip('should work on a selected expression', () => {
            mathField.setContent('35x+5');
            mathField.selectAll();
            mathField.pressKey(Keys.RADICAL);
            // TODO(kevinb): check cursor location
            assert.equal(mathField.getContent(), '\\sqrt[ ]{35x+5}');
        });
    });

    describe('Log', () => {
        it('should work with no content', () => {
            mathField.pressKey(Keys.LOG);
            assert.equal(mathField.getContent(), '\\log\\left(\\right)');
        });

        it('should work after an expression', () => {
            mathField.setContent('35x^2');
            mathField.pressKey(Keys.LOG);
            assert.equal(mathField.getContent(), '35x^2\\log\\left(\\right)');
        });

        it.skip('should work on a selected expression', () => {
            mathField.setContent('35x+5');
            mathField.selectAll();
            mathField.pressKey(Keys.LOG);
            assert.equal(mathField.getContent(), '\\log\\left(35x+5\\right)');
        });
    });

    describe('Log w/ base n', () => {
        it('should work with no content', () => {
            mathField.pressKey(Keys.LOG_N);
            assert.equal(mathField.getContent(), '\\log_{ }\\left(\\right)');
        });

        it('should work after an expression', () => {
            mathField.setContent('35x^2');
            mathField.pressKey(Keys.LOG_N);
            assert.equal(
                mathField.getContent(), '35x^2\\log_{ }\\left(\\right)');
        });

        it.skip('should work on a selected expression', () => {
            mathField.setContent('35x+5');
            mathField.selectAll();
            mathField.pressKey(Keys.LOG_N);
            assert.equal(
                mathField.getContent(), '\\log_{ }\\left(35x+5\\right)');
        });
    });

    describe('Backspace', () => {
        it('should delete an empty fraction from the numerator', () => {
            mathField.setContent('\\frac{ }{ }');
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '');
        });

        it('should convert a fraction when deleting the denominator', () => {
            mathField.setContent('\\frac{35x^2}{ }');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '35x^2');
        });

        // TODO(kevinb) math isn't selected
        it('should select a fraction when deleting from outside of it', () => {
            const expr = '\\frac{35x+5}{x^2}';
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            assert(mathField.isSelected());
            assert.equal(mathField.getContent(), expr);
        });

        it('should delete parens when inside empty parens', () => {
            mathField.setContent('\\left(\\right)');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '');
        });

        it('deletes only the first parens when inside empty parens', () => {
            mathField.setContent('\\left(\\right)\\left(\\right)');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '\\left(\\right)');
        });

        it('should select an expression when deleting from outside (1)', () => {
            const expr = '\\left(35x+5\\right)';
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            assert(mathField.isSelected());
            assert.equal(mathField.getContent(), expr);
        });

        it('should select an expression when deleting from outside (2)', () => {
            const expr = '1+\\left(35x+5\\right)';
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(left.ctrlSeq, '+');
            assert.equal(right, END_OF_EXPR);
            assert.equal(mathField.getContent(), expr);
        });

        it('should select an expression when deleting from outside (3)', () => {
            const expr = '1+\\left(35x+5\\right)-1';
            mathField.setContent(expr);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(left.ctrlSeq, '+');
            assert.equal(right.ctrlSeq, '-');
            assert.equal(mathField.getContent(), expr);
        });

        it('should select an expression when deleting from outside (4)', () => {
            const expr = '\\left(35x+5\\right)-1';
            mathField.setContent(expr);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(left, END_OF_EXPR);
            assert.equal(right.ctrlSeq, '-');
            assert.equal(mathField.getContent(), expr);
        });

        it('should select an expression when deleting from outside', () => {
            mathField.setContent('\\left(35x+5\\right)');
            mathField.pressKey(Keys.BACKSPACE);
            assert(mathField.isSelected());
            assert.equal(mathField.getContent(), '\\left(35x+5\\right)');
        });

        // TODO(kevinb) fix this behavior so that we delete the exponent too
        it.skip('should not delete squared exponents', () => {
            mathField.setContent('35x^2');
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '35x^2');
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '35x^{ }');
        });

        it('should not delete non-square exponents', () => {
            mathField.setContent('35x^5');
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '35x^5');
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '35x^{ }');
        });

        it('should delete an empty exponent', () => {
            mathField.setContent('35x^{}');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '35x');
        });

        it('should delete an empty square root', () => {
            mathField.setContent('\\sqrt{}');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '');
        });

        it('should delete an empty radical when cursor is in index', () => {
            mathField.setContent('\\sqrt[]{}');
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '');
        });

        it('deletes nthroot index normally', () => {
            mathField.setContent('\\sqrt[3]{35x+5}');
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);

            const cursor = mathField.getCursor();

            assert.equal(cursor[MQ.L], END_OF_EXPR);
            assert.equal(mathField.getContent(), '\\sqrt[]{35x+5}');
        });

        it('converts nthroot to sqrt when deleting from index (1)', () => {
            mathField.setContent('\\sqrt[]{35x+5}');
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);

            const cursor = mathField.getCursor();

            assert.equal(cursor[MQ.L], END_OF_EXPR);
            assert.equal(mathField.getContent(), '\\sqrt{35x+5}');
        });

        it('converts nthroot to sqrt when deleting from index (2)', () => {
            mathField.setContent('1+\\sqrt[]{35x+5}');
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);

            const cursor = mathField.getCursor();

            assert.equal(cursor[MQ.L].ctrlSeq, '+');
            assert.equal(mathField.getContent(), '1+\\sqrt{35x+5}');
        });

        it('should not delete if the index has contents', () => {
            const expr = '\\sqrt[3]{35x+5}';
            mathField.setContent(expr);
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);

            assert.equal(mathField.getContent(), expr);
        });

        it('should select a full square root before deleting it', () => {
            const expr = '\\sqrt{35x+5}';
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);

            assert(mathField.isSelected());
            assert.equal(mathField.getContent(), expr);
        });

        it('should select a full nth-root before deleting it', () => {
            const expr = '\\sqrt[3]{35x+5}';
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);

            assert(mathField.isSelected());
            assert.equal(mathField.getContent(), expr);
        });

        it('should delete log when inside empty log', () => {
            mathField.setContent('\\log\\left(\\right)');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '');
        });

        it('should select log when inside full log at head', () => {
            const expr = '\\log\\left(35x\\right)';
            mathField.setContent(expr);
            mathField.moveToStart();
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.BACKSPACE);
            assert(mathField.isSelected());
            assert.equal(mathField.getContent(), expr);
        });

        it('should select log when outside full log at tail (1)', () => {
            const expr = '\\log\\left(35x\\right)';
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            assert(mathField.isSelected());
            assert.equal(mathField.getContent(), expr);
        });

        it('should select log when outside full log at tail (2)', () => {
            const expr = '1+\\log\\left(35x\\right)';
            mathField.setContent(expr);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(left.ctrlSeq, '+');
            assert.equal(right, END_OF_EXPR);
            assert.equal(mathField.getContent(), expr);
        });

        it('should select log when outside full log at tail (3)', () => {
            const expr = '1+\\log\\left(35x\\right)-1';
            mathField.setContent(expr);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(left.ctrlSeq, '+');
            assert.equal(right.ctrlSeq, '-');
            assert.equal(mathField.getContent(), expr);
        });

        it('should select log when outside full log at tail (4)', () => {
            const expr = '\\log\\left(35x\\right)-1';
            mathField.setContent(expr);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);
            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(left, END_OF_EXPR);
            assert.equal(right.ctrlSeq, '-');
            assert.equal(mathField.getContent(), expr);
        });

        it('should delete empty log when at index', () => {
            mathField.setContent('\\log_{ }\\left(\\right)');
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '');
        });

        it('should delete log index normally', () => {
            mathField.setContent('\\log_5\\left(\\right)');
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);
            assert.equal(mathField.getContent(), '\\log_{ }\\left(\\right)');
        });

        it('should move to index from inside empty log with index', () => {
            mathField.setContent('\\log_5\\left(\\right)');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.BACKSPACE);

            const cursor = mathField.getCursor();

            assert.equal(cursor[MQ.L].ctrlSeq, '5');
            assert.equal(mathField.getContent(), '\\log_5\\left(\\right)');
        });

        it('should select full log when deleting from empty index (1)', () => {
            const expr = '\\log_{ }\\left(x\\right)';
            mathField.setContent(expr);
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);

            assert(mathField.isSelected());
            assert.equal(mathField.getContent(), expr);
        });

        it('should select full log when deleting from empty index (2)', () => {
            const expr = '1+\\log_{ }\\left(x\\right)';
            mathField.setContent(expr);
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);

            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(left.ctrlSeq, '+');
            assert.equal(right, END_OF_EXPR);
            assert.equal(mathField.getContent(), expr);
        });

        it('should select full log when deleting from empty index (3)', () => {
            const expr = '1+\\log_{ }\\left(x\\right)-1';
            mathField.setContent(expr);
            mathField.moveToStart();

            // Move right three times to get into the parens, and then left
            // twice to get to the start of the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);

            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(left.ctrlSeq, '+');
            assert.equal(right.ctrlSeq, '-');
            assert.equal(mathField.getContent(), expr);
        });

        it('should select full log when deleting from empty index (4)', () => {
            const expr = '\\log_{ }\\left(x\\right)-1';
            mathField.setContent(expr);
            mathField.moveToStart();

            // Move right once to get into the parens, and then left twice to
            // get to the start of the empty index.
            mathField.pressKey(Keys.RIGHT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);

            mathField.pressKey(Keys.BACKSPACE);

            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(left, END_OF_EXPR);
            assert.equal(right.ctrlSeq, '-');
            assert.equal(mathField.getContent(), expr);
        });
    });

    describe('Left arrow', () => {
        it('skips function names', () => {
            mathField.pressKey(Keys.COS);
            const cursor = mathField.getCursor();

            // Verify that we're inside the function.
            assert.equal(cursor[MQ.L], END_OF_EXPR);
            assert.equal(cursor[MQ.R], END_OF_EXPR);

            // Navigate left.
            mathField.pressKey(Keys.LEFT);

            // Verify that we moved beyond the body of the function.
            assert.equal(cursor[MQ.L], END_OF_EXPR);
            assert.equal(cursor[MQ.R].ctrlSeq, '\\c');
        });

        it('does not skip out of a function with valid content present', () => {
            mathField.pressKey(Keys.COS);
            mathField.pressKey(Keys.PLUS);
            const cursor = mathField.getCursor();

            // Verify that we're inside the function.
            assert.equal(cursor[MQ.L].ctrlSeq, '+');
            assert.equal(cursor[MQ.R], END_OF_EXPR);

            // Navigate left.
            mathField.pressKey(Keys.LEFT);

            // Verify that we didn't move out of the function.
            assert.equal(cursor[MQ.L], END_OF_EXPR);
            assert.equal(cursor[MQ.R].ctrlSeq, '+');
        });
    });

    describe('Right arrow', () => {
        it('skips function names', () => {
            mathField.setContent('\\cos\\left(5\\right)');
            mathField.moveToStart();
            const cursor = mathField.getCursor();

            // Verify that we're outside the function.
            assert.equal(cursor[MQ.L], END_OF_EXPR);
            assert.equal(cursor[MQ.R].ctrlSeq, '\\c');

            // Navigate right.
            mathField.pressKey(Keys.RIGHT);

            // Verify that we moved into the body of the function.
            assert.equal(cursor[MQ.L], END_OF_EXPR);
            assert.equal(cursor[MQ.R].ctrlSeq, '5');
        });
    });

    describe('Toggle sign', () => {
        it('adds \'-\' to an empty expression', () => {
            mathField.setContent('');
            mathField.pressKey(Keys.TOGGLE_SIGN);
            const cursor = mathField.getCursor();

            assert.equal(mathField.getContent(), '-');
            assert.equal(cursor[MQ.L].ctrlSeq, '-');
            assert.equal(cursor[MQ.R], END_OF_EXPR);
        });

        it('removes \'-\' from a minus sign-only expression', () => {
            mathField.setContent('-');
            mathField.pressKey(Keys.TOGGLE_SIGN);
            assert.equal(mathField.getContent(), '');
        });

        it('retains position when adding \'-\'', () => {
            mathField.setContent('123');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.TOGGLE_SIGN);
            const cursor = mathField.getCursor();

            assert.equal(mathField.getContent(), '-123');
            assert.equal(cursor[MQ.L].ctrlSeq, '2');
            assert.equal(cursor[MQ.R].ctrlSeq, '3');
        });

        it('retains position when adding \'-\' from a fraction', () => {
            mathField.setContent('\\frac{3}{4}');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.TOGGLE_SIGN);
            const cursor = mathField.getCursor();

            assert.equal(mathField.getContent(), '-\\frac{3}{4}');
            assert.equal(cursor[MQ.L].ctrlSeq, '4');
            assert.equal(cursor[MQ.R], END_OF_EXPR);
        });

        it('retains position when removing \'-\' from a fraction', () => {
            mathField.setContent('-\\frac{3}{4}');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.TOGGLE_SIGN);
            const cursor = mathField.getCursor();

            assert.equal(mathField.getContent(), '\\frac{3}{4}');
            assert.equal(cursor[MQ.L].ctrlSeq, '4');
            assert.equal(cursor[MQ.R], END_OF_EXPR);
        });

        it('retains position when adding \'-\' from empty fraction', () => {
            mathField.setContent('\\frac{3}{ }');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.TOGGLE_SIGN);
            const cursor = mathField.getCursor();

            assert.equal(mathField.getContent(), '-\\frac{3}{ }');
            assert.equal(cursor[MQ.L], END_OF_EXPR);
            assert.equal(cursor[MQ.R], END_OF_EXPR);
        });

        it('retains position when removing \'-\' from empty fraction', () => {
            mathField.setContent('-\\frac{3}{ }');
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.TOGGLE_SIGN);
            const cursor = mathField.getCursor();

            assert.equal(mathField.getContent(), '\\frac{3}{ }');
            assert.equal(cursor[MQ.L], END_OF_EXPR);
            assert.equal(cursor[MQ.R], END_OF_EXPR);
        });

        it('retains selection when adding \'-\'', () => {
            mathField.setContent('\\frac{3}{4}');
            mathField.pressKey(Keys.BACKSPACE);
            mathField.pressKey(Keys.TOGGLE_SIGN);

            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(mathField.getContent(), '-\\frac{3}{4}');
            assert.equal(left.ctrlSeq, '-');
            assert.equal(right, END_OF_EXPR);
        });

        it('retains selection when removing \'-\'', () => {
            mathField.setContent('-5\\frac{3}{4}');
            mathField.pressKey(Keys.BACKSPACE);
            mathField.pressKey(Keys.TOGGLE_SIGN);

            const selection = mathField.getSelection();
            const left = selection.ends[MQ.L][MQ.L];
            const right = selection.ends[MQ.R][MQ.R];

            assert.equal(mathField.getContent(), '5\\frac{3}{4}');
            assert.equal(left.ctrlSeq, '5');
            assert.equal(right, END_OF_EXPR);
        });
    });

    describe.skip('Equals =, !=, <, <=, >, >=', () => {

    });
});
