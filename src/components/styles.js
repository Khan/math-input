/**
 * Common styles shared across components.
 */

const {StyleSheet} = require('aphrodite');

const {compactKeypadBorderRadiusPx} = require('./common-style');

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
    stretch: {
        alignItems: 'stretch',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredText: {
        textAlign: 'center',
    },
    roundedTopLeft: {
        borderTopLeftRadius: compactKeypadBorderRadiusPx,
    },
    roundedTopRight: {
        borderTopRightRadius: compactKeypadBorderRadiusPx,
    },
    reverseRow: {
        flexDirection: 'row-reverse',
    },
    reverseColumn: {
        flexDirection: 'column-reverse',
    },
    keyLeft: {
        order: 1,
    },
    keyCenter: {
        order: 2,
    },
    keyRight: {
        order: 3,
    }
});
