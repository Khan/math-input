const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const KeypadButton = require('./keypad-button');
const ButtonProps = require('./button-props');

const MathKeypad = React.createClass({
    render() {
        return <View style={styles.keypad}>
            <View style={styles.row}>
                <KeypadButton {...ButtonProps.NUM_7} />
                <KeypadButton {...ButtonProps.NUM_8} />
                <KeypadButton {...ButtonProps.NUM_9} />
                <KeypadButton {...ButtonProps.PLUS} />
                <KeypadButton {...ButtonProps.EXP} />
                <KeypadButton {...ButtonProps.LEFT} />
            </View>
            <View style={styles.row}>
                <KeypadButton {...ButtonProps.NUM_4} />
                <KeypadButton {...ButtonProps.NUM_5} />
                <KeypadButton {...ButtonProps.NUM_6} />
                <KeypadButton {...ButtonProps.MINUS} />
                <KeypadButton {...ButtonProps.SQRT} />
                <KeypadButton {...ButtonProps.RIGHT} />
            </View>
            <View style={styles.row}>
                <KeypadButton {...ButtonProps.NUM_1} />
                <KeypadButton {...ButtonProps.NUM_2} />
                <KeypadButton {...ButtonProps.NUM_3} />
                <KeypadButton {...ButtonProps.TIMES} />
                <KeypadButton {...ButtonProps.CDOT} />
                <KeypadButton {...ButtonProps.EQUAL} />
            </View>
            <View style={styles.row}>
                <KeypadButton {...ButtonProps.x} />
                <KeypadButton {...ButtonProps.NUM_0} />
                <KeypadButton {...ButtonProps.DECIMAL} />
                <KeypadButton {...ButtonProps.DIVIDE} />
                <KeypadButton {...ButtonProps.FRAC} />
                <KeypadButton {...ButtonProps.BACKSPACE} />
            </View>
        </View>;
    },
});

const styles = StyleSheet.create({
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

module.exports = MathKeypad;
