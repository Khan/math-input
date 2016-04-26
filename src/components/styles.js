/**
 * Common styles shared across components.
 */

const { StyleSheet } = require('aphrodite');

module.exports = StyleSheet.create({
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    oneColumn: {
        flexGrow: 1,
    },
    twoColumn: {
        flexGrow: 2,
    },
    keypad: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        paddingRight: 1,
        paddingBottom: 1,
    },
    fullWidth: {
        width: '100%',
    },
});
