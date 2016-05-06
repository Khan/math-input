/**
 * Constants that define the various contexts in which a cursor can exist. In
 * the future, we may, for example, have a context for being in a numerator, a
 * context for being in a denominator, a context for being in an exponent, and
 * so forth.
 */

module.exports = {
    TOP_LEVEL: 'TOP_LEVEL',
    NESTED: 'NESTED',
};
