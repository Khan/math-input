const Symbols = require('./symbols');
const actions = require('./actions');

const CMD = true;

const KeyProps = {
    PLUS: {
        label: '+',
        onClick: () => actions.pressKey('+'),
    },
    MINUS: {
        label: Symbols.MINUS,
        onClick: () => actions.pressKey('-'),
    },
    TIMES: {
        label: Symbols.TIMES,
        onClick: () => actions.pressKey('\\times'),
    },
    DIVIDE: {
        label: Symbols.DIVIDE,
        onClick: () => actions.pressKey("\\div"),
    },
    DECIMAL: {
        label: '.',
        onClick: () => actions.pressKey('.'),
    },
    EQUAL: {
        label: '=',
        onClick: () => actions.pressKey('='),
    },
    FRAC: {
        label: '/',
        onClick: () => actions.pressKey("/", CMD),
    },
    EXP: {
        label: '^',
        onClick: () => actions.pressKey('^', CMD),
    },
    SQRT: {
        label: Symbols.SQRT,
        onClick: () => actions.pressKey('sqrt', CMD),
    },
    DOT: {
        label: Symbols.CDOT,
        onClick: () => actions.pressKey('\\cdot'),
    },
    LEFT: {
        label: Symbols.LEFT_ARROW,
        onClick: () => actions.pressKey('Left'),
    },
    RIGHT: {
        label: Symbols.RIGHT_ARROW,
        onClick: () => actions.pressKey('Right'),
    },
    BACKSPACE: {
        label: Symbols.BACKSPACE,
        onClick: () => actions.pressKey('Backspace'),
    }
};

for (const num of '0123456789') {
    KeyProps[`NUM_${num}`] = {
        label: num,
        onClick: () => actions.pressKey(num),
    };
}

for (const letter of 'xyz') {
    KeyProps[letter] = {
        label: letter,
        onClick: () => actions.pressKey(letter),
    };
}

module.exports = KeyProps;
