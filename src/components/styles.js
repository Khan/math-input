/**
 * Common styles shared across components.
 */

const { StyleSheet } = require('aphrodite');

module.exports = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    keypad: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        paddingRight: 1,
        paddingBottom: 1,
    },
});
