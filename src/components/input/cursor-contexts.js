/**
 * Constants that define the various contexts in which a cursor can exist. In
 * the future, we may, for example, have a context for being in a numerator, a
 * context for being in a denominator, a context for being in an exponent, and
 * so forth.
 */

module.exports = {
    // The cursor is located in a nested expression. For example, it may be in
    // a numerator or denominator, or within a set of parentheses.
    NESTED: 'NESTED',
    // The cursor is located in a top-level expression; that is, anything that
    // is not nested.
    TOP_LEVEL: 'TOP_LEVEL',
    // The cursor is located at the left end of the input. Note that this
    // implies that the cursor is at the top-level.
    LEFT_END: 'LEFT_END',
    // The cursor is located at the right end of the input. Note that this
    // implies that the cursor is at the top-level.
    RIGHT_END: 'RIGHT_END',
    // The cursor is located in an empty input. Note that this
    // implies that the cursor is at the top-level, and at the right and left
    // ends.
    EMPTY: 'EMPTY',
};
