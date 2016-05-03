// TODO(kevinb) allow test code to use const MathQuill = require('mathquill');
const MathQuill = window.MathQuill;
const MQ = MathQuill.getInterface(2);

const MathWrapper = require('../src/components/math-wrapper');

class TestMathWrapper extends MathWrapper {
    setContent(latex) {
        this.mathField.latex(latex);
    }

    getContent() {
        return this.mathField.latex();
    }

    selectAll() {
        this.mathField.select();
    }

    clearSelection() {
        this.mathField.clearSelection();
    }

    moveToStart() {
        this.mathField.moveToDirEnd(MQ.L);
    }

    isSelected() {
        const selection = this.getSelection();

        if (selection) {
            return selection.ends[-1][-1] === 0 && selection.ends[1][1] === 0;
        }

        return false;
    }
}

module.exports = TestMathWrapper;
