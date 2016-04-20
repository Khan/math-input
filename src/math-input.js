const React = require('react');
const { StyleSheet } = require("aphrodite");
const ReactRedux = require("react-redux");

const actions = require('./actions');

const MathQuill = window.MathQuill;

const MathInput = React.createClass({
    propTypes: {
        currentValue: React.PropTypes.string.isRequired,
        // cursor: React.PropTypes.number,
        // onChange: React.PropTypes.func,
    },

    componentDidMount() {
        var MQ = MathQuill.getInterface(2);
        this.mathfield = MQ.MathField(this.refs.mathinput, {
            handlers: {
                edit: () => {
                    console.log(this.mathfield.latex());
                }
            }
        });

        // pass this component's handleKey method to the store so it can call
        // it whenever the store gets an KeyPress action from the keypad
        actions.registerKeyHandler(this.handleKey);
    },

    handleKey(e) {
        console.log('MathInput.handleKey');
        console.log(e);
        if ('^/*'.includes(e)) {
            this.mathfield.cmd(e).focus();
        } else {
            this.mathfield.write(e).focus();
        }
    },

    render() {
        return <div>
            <span ref='mathinput'></span>
        </div>;
    },
});

const styles = StyleSheet.create({
    input: {
        border: 'solid 1px black',
        margin: 5,
    },
});

const ConnectedMathInput = ReactRedux.connect(state => state)(MathInput);

module.exports = MathInput;
