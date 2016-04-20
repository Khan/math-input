const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('./react-native');
const KeypadButton = require('./keypad-button');
const actions = require('./actions');
const Symbols = require('./symbols');
const Keys = require('./keys');

const CMD = true;

const MathKeypad = React.createClass({
    render() {
        return <View style={styles.keypad}>
            <View style={styles.row}>
                <KeypadButton label="7" onClick={() => actions.pressKey("7")} style={styles.firstKey}/>
                <KeypadButton label="8" onClick={() => actions.pressKey("8")} />
                <KeypadButton label="9" onClick={() => actions.pressKey("9")} />
                <KeypadButton label="+" onClick={() => actions.pressKey("+")} />
                <KeypadButton label="^" onClick={() => actions.pressKey("^", CMD)} />
                <KeypadButton label={Symbols.LEFT_ARROW} onClick={() => actions.pressKey(Keys.LEFT)} style={styles.lastKey}/>
            </View>
            <View style={styles.row}>
                <KeypadButton label="4" onClick={() => actions.pressKey("4")} style={styles.firstKey} />
                <KeypadButton label="5" onClick={() => actions.pressKey("5")} />
                <KeypadButton label="6" onClick={() => actions.pressKey("6")} />
                <KeypadButton label={Symbols.MINUS} onClick={() => actions.pressKey("-")} />
                <KeypadButton label={Symbols.SQRT} onClick={() => actions.pressKey("sqrt", CMD)} />
                <KeypadButton label={Symbols.RIGHT_ARROW} onClick={() => actions.pressKey(Keys.RIGHT)} style={styles.lastKey} />
            </View>
            <View style={styles.row}>
                <KeypadButton label="1" onClick={() => actions.pressKey("1")} style={styles.firstKey} />
                <KeypadButton label="2" onClick={() => actions.pressKey("2")} />
                <KeypadButton label="3" onClick={() => actions.pressKey("3")} />
                <KeypadButton label={Symbols.TIMES} onClick={() => actions.pressKey("\\times")} />
                <KeypadButton label={Symbols.CDOT} onClick={() => actions.pressKey("\\cdot")}/>
                <KeypadButton label="=" onClick={() => actions.pressKey("=")}  style={styles.lastKey} />
            </View>
            <View style={styles.row}>
                <KeypadButton label="x" onClick={() => actions.pressKey("x")} style={[styles.firstKey, styles.bottomKey]} />
                <KeypadButton label="0" onClick={() => actions.pressKey("0")} style={styles.bottomKey} />
                <KeypadButton label="." onClick={() => actions.pressKey(".")} style={styles.bottomKey} />
                <KeypadButton label={Symbols.DIVISION} onClick={() => actions.pressKey("\\div")} style={styles.bottomKey}  />
                <KeypadButton label="/" onClick={() => actions.pressKey("/", CMD)} style={styles.bottomKey}  />
                <KeypadButton label={Symbols.BACKSPACE} onClick={() => actions.pressKey(Keys.BACKSPACE)} style={[styles.lastKey, styles.bottomKey]} />
            </View>
        </View>;
    }
});

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
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
