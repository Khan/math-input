/**
 * Common styles shared across components.
 */

const {StyleSheet} = require('aphrodite');

module.exports = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    oneColumn: {
        flexGrow: 1,
    },
    fullWidth: {
        width: '100%',
    },
    fullFlex: {
        flexBasis: '100%',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredText: {
        textAlign: 'center',
    },
});
