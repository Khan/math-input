/**
 * A dictionary of symbols (glyphs) used as icongraphy for keypad buttons.
 */

const Keys = require('./keys');

const Symbols = {
    [Keys.PLUS]: '+',
    [Keys.MINUS]: '\u2212',
    [Keys.TOGGLE_SIGN]: '\u00B1',
    [Keys.TIMES]: '\u00D7',
    [Keys.DIVIDE]: '\u00F7',
    [Keys.DECIMAL]: '.',
    [Keys.PERCENT]: '%',
    [Keys.CDOT]: '\u00B7',
    [Keys.EQUAL]: '=',
    [Keys.FRAC]: '/',
    [Keys.EXP]: '^',
    [Keys.SQRT]: '\u221A',
    [Keys.PI]: '\u03C0',
    [Keys.RADICAL]: 'n\u221A',
    [Keys.LEFT]: '\u2190',
    [Keys.RIGHT]: '\u2192',
    [Keys.BACKSPACE]: '\u232B',
    [Keys.DISMISS]: 'X',
    [Keys.MORE]: '...',
    [Keys.NUMBERS]: '123',
    [Keys.PARENS]: '()',
    [Keys.LOG]: 'log',
    [Keys.LOG_N]: 'log_n',
    [Keys.SIN]: 'sin',
    [Keys.COS]: 'cos',
    [Keys.TAN]: 'tan',
};

module.exports = Symbols;
