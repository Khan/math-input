const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('./react-native');
const KeypadButton = require('./keypad-button');
const actions = require('./actions');

const MathKeypad = React.createClass({
    render() {
        return <div>
            <View style={styles.row}>
                <KeypadButton label="7" onClick={() => actions.pressKey("7")} />
                <KeypadButton label="8" onClick={() => actions.pressKey("8")} />
                <KeypadButton label="9" onClick={() => actions.pressKey("9")} />
                <KeypadButton label="+" onClick={() => actions.pressKey("+")} />
            </View>
            <View style={styles.row}>
                <KeypadButton label="4" onClick={() => actions.pressKey("4")} />
                <KeypadButton label="5" onClick={() => actions.pressKey("5")} />
                <KeypadButton label="6" onClick={() => actions.pressKey("6")} />
                <KeypadButton label="-" onClick={() => actions.pressKey("-")} />
            </View>
            <View style={styles.row}>
                <KeypadButton label="1" onClick={() => actions.pressKey("1")} />
                <KeypadButton label="2" onClick={() => actions.pressKey("2")} />
                <KeypadButton label="3" onClick={() => actions.pressKey("3")} />
                <KeypadButton label="*" onClick={() => actions.pressKey("*")} />
            </View>
            <View style={styles.row}>
                <KeypadButton label="x" onClick={() => actions.pressKey("x")} />
                <KeypadButton label="0" onClick={() => actions.pressKey("0")} />
                <KeypadButton label="." onClick={() => actions.pressKey(".")} />
                <KeypadButton label="/" onClick={() => actions.pressKey("/")} />
            </View>
        </div>;
    }
});

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    }
});

module.exports = MathKeypad;
