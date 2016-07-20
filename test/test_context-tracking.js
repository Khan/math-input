/* eslint-env node, mocha */
require('babel-polyfill');
const jsdom = require('jsdom');
const assert = require('assert');

const Keys = require('../src/data/keys');
const CursorContexts = require('../src/components/input/cursor-contexts');

const createMathField = (document, MathWrapper) => {
    const span = document.createElement('span');
    document.body.appendChild(span);

    return new MathWrapper(span);
};

// TODO(charlie): Add proper tests to distinguish between left-end, right-end,
// empty, and top-level contexts. (Note that the first three contexts all imply
// top-level.)
const isAtTopLevel = (context) => {
    return context === CursorContexts.TOP_LEVEL ||
        context === CursorContexts.EMPTY ||
        context === CursorContexts.LEFT_END ||
        context === CursorContexts.RIGHT_END;
};

describe('Cursor context', () => {
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

    it('should treat number-only expressions as top-level', () => {
        mathField.pressKey('NUM_1');
        mathField.pressKey('NUM_2');
        const cursor = mathField.pressKey('NUM_3');
        assert.ok(isAtTopLevel(cursor.context));
    });

    it('should treat numbers and ternary operators as top-level', () => {
        mathField.pressKey('NUM_1');
        mathField.pressKey(Keys.CDOT);
        const cursor = mathField.pressKey('NUM_2');
        assert.ok(isAtTopLevel(cursor.context));
    });

    it('should treat fractions as nested', () => {
        const cursor = mathField.pressKey(Keys.FRAC);
        assert.equal(cursor.context, CursorContexts.NESTED);
    });

    it('should treat parentheses as nested', () => {
        const cursor = mathField.pressKey(Keys.LEFT_PAREN);
        assert.equal(cursor.context, CursorContexts.NESTED);
    });

    it('should treat square roots as nested', () => {
        const cursor = mathField.pressKey(Keys.SQRT);
        assert.equal(cursor.context, CursorContexts.NESTED);
    });

    it('should treat multiply nested expressions as nested', () => {
        mathField.pressKey(Keys.LEFT_PAREN);
        const cursor = mathField.pressKey(Keys.SQRT);
        assert.equal(cursor.context, CursorContexts.NESTED);
    });

    it('should treat the right of a nested expression as top-level', () => {
        mathField.pressKey(Keys.LEFT_PAREN);
        const cursor = mathField.pressKey(Keys.RIGHT);
        assert.ok(isAtTopLevel(cursor.context));
    });

    it('should treat the left of a nested expression as top-level', () => {
        mathField.pressKey(Keys.LEFT_PAREN);
        const cursor = mathField.pressKey(Keys.LEFT);
        assert.ok(isAtTopLevel(cursor.context));
    });

    it('a top-level expression in a nested expression is nested', () => {
        mathField.pressKey(Keys.LEFT_PAREN);
        mathField.pressKey('NUM_1');
        mathField.pressKey(Keys.CDOT);
        mathField.pressKey('NUM_2');
        const cursor = mathField.pressKey(Keys.LEFT);
        assert.equal(cursor.context, CursorContexts.NESTED);
    });
});
