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

    it('should treat number-only expressions as non-jumpable', () => {
        mathField.pressKey('NUM_1');
        mathField.pressKey('NUM_2');
        const cursor = mathField.pressKey('NUM_3');
        assert.equal(cursor.context, CursorContexts.NONE);
    });

    it('should treat numbers and ternary operators as non-jumpable', () => {
        mathField.pressKey('NUM_1');
        mathField.pressKey(Keys.CDOT);
        const cursor = mathField.pressKey('NUM_2');
        assert.equal(cursor.context, CursorContexts.NONE);
    });

    describe('Before fraction', () => {
        it('should detect when immediately to the left', () => {
            const cursor = mathField.pressKey(Keys.FRAC_EXCLUSIVE);
            assert.equal(cursor.context, CursorContexts.BEFORE_FRACTION);
        });

        it('should detect when numbers are between', () => {
            mathField.pressKey('NUM_1');
            mathField.pressKey(Keys.FRAC_EXCLUSIVE);
            mathField.pressKey(Keys.LEFT);
            const cursor = mathField.pressKey(Keys.LEFT);
            assert.equal(cursor.context, CursorContexts.BEFORE_FRACTION);
        });

        it('should not detect when operators are between', () => {
            mathField.pressKey('NUM_1');
            mathField.pressKey(Keys.PLUS);
            mathField.pressKey('NUM_2');
            mathField.pressKey(Keys.FRAC_EXCLUSIVE);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            const cursor = mathField.pressKey(Keys.LEFT);
            assert.equal(cursor.context, CursorContexts.NONE);
        });

        it('should not detect when parens are between', () => {
            mathField.pressKey('NUM_1');
            mathField.pressKey(Keys.LEFT_PAREN);
            mathField.pressKey(Keys.RIGHT_PAREN);
            mathField.pressKey('NUM_2');
            mathField.pressKey(Keys.FRAC_EXCLUSIVE);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            mathField.pressKey(Keys.LEFT);
            const cursor = mathField.pressKey(Keys.LEFT);
            assert.equal(cursor.context, CursorContexts.NONE);
        });
    });

    describe('In parens', () => {
        it('should detect when inside empty parens', () => {
            mathField.pressKey(Keys.LEFT_PAREN);
            mathField.pressKey(Keys.RIGHT_PAREN);
            const cursor = mathField.pressKey(Keys.LEFT);
            assert.equal(cursor.context, CursorContexts.IN_PARENS);
        });

        it('should detect when inside non-empty parens', () => {
            mathField.pressKey(Keys.LEFT_PAREN);
            mathField.pressKey('NUM_2');
            mathField.pressKey(Keys.RIGHT_PAREN);
            const cursor = mathField.pressKey(Keys.LEFT);
            assert.equal(cursor.context, CursorContexts.IN_PARENS);
        });
    });

    describe('In superscript', () => {
        it('should detect when inside empty superscript', () => {
            mathField.pressKey('NUM_2');
            const cursor = mathField.pressKey(Keys.EXP);
            assert.equal(cursor.context, CursorContexts.IN_SUPER_SCRIPT);
        });

        it('should detect when inside non-empty superscript', () => {
            mathField.pressKey('NUM_2');
            mathField.pressKey(Keys.EXP);
            const cursor = mathField.pressKey('NUM_3');
            assert.equal(cursor.context, CursorContexts.IN_SUPER_SCRIPT);
        });
    });

    describe('In subscript', () => {
        it('should detect when inside empty superscript', () => {
            const cursor = mathField.pressKey(Keys.LOG_N);
            assert.equal(cursor.context, CursorContexts.IN_SUB_SCRIPT);
        });

        it('should detect when inside non-empty superscript', () => {
            mathField.pressKey(Keys.LOG_N);
            const cursor = mathField.pressKey('NUM_2');
            assert.equal(cursor.context, CursorContexts.IN_SUB_SCRIPT);
        });
    });

    describe('In numerator', () => {
        it('should detect when inside empty numerator', () => {
            const cursor = mathField.pressKey(Keys.FRAC_INCLUSIVE);
            assert.equal(cursor.context, CursorContexts.IN_NUMERATOR);
        });

        it('should detect when inside non-empty numerator', () => {
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            const cursor = mathField.pressKey('NUM_2');
            assert.equal(cursor.context, CursorContexts.IN_NUMERATOR);
        });
    });

    describe('In denominator', () => {
        it('should detect when inside empty denominator', () => {
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            const cursor = mathField.pressKey(Keys.RIGHT);
            assert.equal(cursor.context, CursorContexts.IN_DENOMINATOR);
        });

        it('should detect when inside non-empty denominator', () => {
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            mathField.pressKey(Keys.RIGHT);
            const cursor = mathField.pressKey('NUM_2');
            assert.equal(cursor.context, CursorContexts.IN_DENOMINATOR);
        });
    });

    describe('Nesting', () => {
        it('should defer to jumping into fraction if possible', () => {
            // Move inside parens, but include a fraction.
            mathField.pressKey(Keys.LEFT_PAREN);
            mathField.pressKey('NUM_2');
            mathField.pressKey(Keys.FRAC_EXCLUSIVE);
            const cursor = mathField.pressKey(Keys.LEFT);
            assert.equal(cursor.context, CursorContexts.BEFORE_FRACTION);
        });

        it('should defer to the nearest parent (1)', () => {
            // Move inside parens, inside a superscript.
            mathField.pressKey('NUM_2');
            mathField.pressKey(Keys.EXP);
            mathField.pressKey(Keys.LEFT_PAREN);
            const cursor = mathField.pressKey('NUM_3');
            assert.equal(cursor.context, CursorContexts.IN_PARENS);
        });

        it('should defer to the nearest parent (2)', () => {
            // Nest fractions, and put cursor in the denominator of the fraction
            // in the numerator.
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            mathField.pressKey(Keys.FRAC_INCLUSIVE);
            const cursor = mathField.pressKey(Keys.RIGHT);
            assert.equal(cursor.context, CursorContexts.IN_DENOMINATOR);
        });
    });
});
