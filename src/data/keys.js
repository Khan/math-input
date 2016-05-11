/**
 * This file contains constants for keypad buttons that aren't single
 * alphanumeric characters.
 */

// TODO(charlie): There's duplication between this file and key-configs.js.
// We should clean it up by removing this file and requiring clients to use the
// `id` field on the key configurations.
const Keys = {
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    TOGGLE_SIGN: 'TOGGLE_SIGN',
    TIMES: 'TIMES',
    DIVIDE: 'DIVIDE',
    DECIMAL: 'DECIMAL',
    PERCENT: 'PERCENT',
    CDOT: 'CDOT',
    EQUAL: 'EQUAL',
    NEQ: 'NEQ',
    GT: 'GT',
    LT: 'LT',
    GEQ: 'GEQ',
    LEQ: 'LEQ',
    FRAC: 'FRAC',
    EXP: 'EXP',
    EXP_2: 'EXP_2',
    EXP_3: 'EXP_3',
    SQRT: 'SQRT',
    CUBE_ROOT: 'CUBE_ROOT',
    RADICAL: 'RADICAL',
    PARENS: 'PARENS',
    LN: 'LN',
    LOG: 'LOG',
    LOG_N: 'LOG_N',
    SIN: 'SIN',
    COS: 'COS',
    TAN: 'TAN',

    // TODO(charlie): Add in additional Greek letters.
    PI: 'PI',
    THETA: 'THETA',

    FRAC_MULTI: 'FRAC_MULTI',
    PARENS_MULTI: 'PARENS_MULTI',
    EQUAL_MULTI: 'EQUAL_MULTI',
    LESS_MULTI: 'LESS_MULTI',
    GREATER_MULTI: 'GREATER_MULTI',
    EXP_MULTI: 'EXP_MULTI',
    RADICAL_MULTI: 'RADICAL_MULTI',
    LOG_MULTI: 'LOG_MULTI',

    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    JUMP_OUT: 'JUMP_OUT',
    BACKSPACE: 'BACKSPACE',
    DISMISS: 'DISMISS',
    MORE: 'MORE',
    NUMBERS: 'NUMBERS',

    NOOP: 'NOOP',

    // A custom key that captures an arbitrary number of symbols but has no
    // 'default' symbol or action.
    MANY: 'MANY',
};

module.exports = Keys;
