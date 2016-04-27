/**
 * Common styles shared across components.
 */

const { StyleSheet } = require('aphrodite');

module.exports = StyleSheet.create({
    keypad: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        paddingRight: 1,
        paddingBottom: 1,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    oneColumn: {
        flexGrow: 1,
    },
    twoColumn: {
        flexGrow: 2,
    },
    fullWidth: {
        width: '100%',
    },
    rightAligned: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    leftAligned: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
