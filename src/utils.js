// @flow

const {DecimalSeparators, DivSeparators} = require("./consts");

// We expect `window.mathConfig` to be exposed by the parent
let decimalSeparator;
if (
    typeof window !== "undefined" &&
    window.mathConfig &&
    window.mathConfig.decimalSeparator === ","
) {
    decimalSeparator = DecimalSeparators.COMMA;
} else {
    decimalSeparator = DecimalSeparators.PERIOD;
}

let divSeparator;
if (
    typeof window !== "undefined" &&
    window.mathConfig &&
    window.mathConfig.divSeparator === ":"
) {
    divSeparator = DivSeparators.CUSTOM;
} else {
    divSeparator = DivSeparators.CLASSIC;
}

module.exports = {
    decimalSeparator,
    divSeparator,
};
