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
                <KeypadButton {...KeyProps.NUM_7} />
                <KeypadButton {...KeyProps.NUM_8} />
                <KeypadButton {...KeyProps.NUM_9} />
                <KeypadButton {...KeyProps.PLUS} />
                <KeypadButton {...KeyProps.EXP} />
                <KeypadButton {...KeyProps.LEFT} />
            </View>
            <View style={styles.row}>
                <KeypadButton {...KeyProps.NUM_4} />
                <KeypadButton {...KeyProps.NUM_5} />
                <KeypadButton {...KeyProps.NUM_6} />
                <KeypadButton {...KeyProps.MINUS} />
                <KeypadButton {...KeyProps.SQRT} />
                <KeypadButton {...KeyProps.RIGHT} />
            </View>
            <View style={styles.row}>
                <KeypadButton {...KeyProps.NUM_1} />
                <KeypadButton {...KeyProps.NUM_2} />
                <KeypadButton {...KeyProps.NUM_3} />
                <KeypadButton {...KeyProps.TIMES} />
                <KeypadButton {...KeyProps.DOT} />
                <KeypadButton {...KeyProps.EQUAL} />
            </View>
            <View style={styles.row}>
                <KeypadButton {...KeyProps.x} />
                <KeypadButton {...KeyProps.NUM_0} />
                <KeypadButton {...KeyProps.DECIMAL} />
                <KeypadButton {...KeyProps.DIVIDE} />
                <KeypadButton {...KeyProps.FRAC} />
                <KeypadButton {...KeyProps.BACKSPACE} />
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
    keypad: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        paddingRight: 1,
        paddingBottom: 1,
    }
});

module.exports = MathKeypad;
