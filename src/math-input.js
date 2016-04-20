const React = require('react');
const ReactDOM = require('react-dom');
const { StyleSheet } = require("aphrodite");
const MathQuill = require('mathquill');

const { View } = require('./react-native');

const actions = require('./actions');
const Keys = require('./keys');

const MathInput = React.createClass({
    propTypes: {
        currentValue: React.PropTypes.string.isRequired,
        // cursor: React.PropTypes.number,
        // onChange: React.PropTypes.func,
    },

    componentDidMount() {
        const container = ReactDOM.findDOMNode(this);
        const span = document.createElement('span');
        container.appendChild(span);

        var MQ = MathQuill.getInterface(2);
        this.mathField = MQ.MathField(span, {
            handlers: {
                edit: () => {
                    console.log(this.mathField.latex());
                }
            }
        });

        // pass this component's handleKey method to the store so it can call
        // it whenever the store gets an KeyPress action from the keypad
        actions.registerKeyHandler(this.handleKey);
    },

    handleKey(key, cmd) {
        if (Object.values(Keys).includes(key)) {
            this.mathField.keystroke(key);
        } else if (cmd) {
            this.mathField.cmd(key).focus();
        } else {
            this.mathField.write(key).focus();
        }
    },

    render() {
        return <View style={styles.input} />;
    },
});

const styles = StyleSheet.create({
    input: {
        margin: 5,
        fontSize: 48,
    },
});

module.exports = MathInput;
