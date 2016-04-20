const React = require('react');
const { StyleSheet, css } = require('aphrodite');

const store = require('./store');

const View = (props) =>
    <div
        onClick={props.onClick}
        className={css(defaultStyles.View, props.style)}
    >
        {props.children}
    </div>;

const Text = (props) =>
    <span className={css(props.style)}>
        {props.children}
    </span>;

const defaultStyles = StyleSheet.create({
    View: {
        display: 'inline-block',
    },
});

const KeypadButton = React.createClass({
    propType: {
        label: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
    },

    componentDidMount() {
        console.log(`componentDidMount: ${this.props.label}`);
    },

    handleClick() {
        store.dispatch({
            type: 'KeyPress',
            key: this.props.label,
        });
    },

    render() {
        return <View style={styles.button} onClick={this.handleClick}>
            <Text style={styles.text}>{this.props.label}</Text>
        </View>;
    },
});

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100,
        border: 'solid 1px gray',
        lineHeight: '100px',
        textAlign: 'center',
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 48,
    },
});


const MathKeypad = React.createClass({
    render() {
        return <div>
            <div>
                <KeypadButton label="7"/>
                <KeypadButton label="8"/>
                <KeypadButton label="9"/>
                <KeypadButton label="+"/>
            </div>
            <div>
                <KeypadButton label="4"/>
                <KeypadButton label="5"/>
                <KeypadButton label="6"/>
                <KeypadButton label="-"/>
            </div>
            <div>
                <KeypadButton label="1"/>
                <KeypadButton label="2"/>
                <KeypadButton label="3"/>
                <KeypadButton label="*"/>
            </div>
            <div>
                <KeypadButton label="x"/>
                <KeypadButton label="0"/>
                <KeypadButton label="."/>
                <KeypadButton label="/"/>
            </div>
        </div>;
    }
});

module.exports = MathKeypad;
