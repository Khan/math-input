const {DecimalSeparators} = require('./consts');

// We expect `window.icu` to be exposed by the parent. When in doubt, we fall
// back to a period.
let decimalSeparator;
if (typeof window !== 'undefined' && window.icu &&
        window.icu.getDecimalFormatSymbols().decimal_separator === ',') {
    decimalSeparator = DecimalSeparators.COMMA;
} else {
    decimalSeparator = DecimalSeparators.PERIOD;
}

module.exports = {
    decimalSeparator,
};
