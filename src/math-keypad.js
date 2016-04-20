const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('./react-native');
const KeypadButton = require('./keypad-button');
const actions = require('./actions');
const KeyProps = require('./key-props');

const MathKeypad = React.createClass({
    render() {
        for (const num of '0123456789') {
            KeyProps[`NUM_${num}`] = {
                label: num,
                onClick: () => actions.pressKey(num),
            };
        }

        for (const letter of 'xyz') {
            KeyProps[letter] = {
                label: letter,
                onClick: () => actions.pressKey(letter),
            };
        }

        return <View style={styles.keypad}>
            <View style={styles.row}>
                <KeypadButton {...KeyProps.NUM_7} style={styles.firstKey}/>
                <KeypadButton {...KeyProps.NUM_8} />
                <KeypadButton {...KeyProps.NUM_9} />
                <KeypadButton {...KeyProps.PLUS} />
                <KeypadButton {...KeyProps.EXP} />
                <KeypadButton {...KeyProps.LEFT} style={styles.lastKey}/>
            </View>
            <View style={styles.row}>
                <KeypadButton {...KeyProps.NUM_4} style={styles.firstKey} />
                <KeypadButton {...KeyProps.NUM_5} />
                <KeypadButton {...KeyProps.NUM_6} />
                <KeypadButton {...KeyProps.MINUS} />
                <KeypadButton {...KeyProps.SQRT} />
                <KeypadButton {...KeyProps.RIGHT} style={styles.lastKey} />
            </View>
            <View style={styles.row}>
                <KeypadButton {...KeyProps.NUM_1} style={styles.firstKey} />
                <KeypadButton {...KeyProps.NUM_2} />
                <KeypadButton {...KeyProps.NUM_3} />
                <KeypadButton {...KeyProps.TIMES} />
                <KeypadButton {...KeyProps.DOT} />
                <KeypadButton {...KeyProps.EQUAL} style={styles.lastKey} />
            </View>
            <View style={styles.row}>
                <KeypadButton {...KeyProps.x} style={[styles.firstKey, styles.bottomKey]} />
                <KeypadButton {...KeyProps.NUM_0} style={styles.bottomKey} />
                <KeypadButton {...KeyProps.DECIMAL} style={styles.bottomKey} />
                <KeypadButton {...KeyProps.DIVIDE} style={styles.bottomKey}  />
                <KeypadButton {...KeyProps.FRAC} style={styles.bottomKey}  />
                <KeypadButton {...KeyProps.BACKSPACE} style={[styles.lastKey, styles.bottomKey]} />
            </View>
        </View>;
    }
});

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        ':last-child': {
            backgroundColor: 'red',
        }
    },
    // TODO(kevinb): ask Emily about :last-child selector
    firstKey: {
        borderLeftWidth: 1,
    },
    lastKey: {
        borderRightWidth: 1,
    },
    bottomKey: {
        borderBottomWidth: 1,
    },
    keypad: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
    }
});

module.exports = MathKeypad;
