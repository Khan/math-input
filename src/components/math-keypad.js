const React = require('react');
const { connect } = require('react-redux');

const DefaultKeypad = require('./default-keypad');
const NumberKeypad = require('./number-keypad');
const FractionKeypad = require('./fraction-keypad');

const { keypadTypes } = require('./consts');

const MathKeypad = React.createClass({
    propTypes: {
        keypadType: React.PropTypes.oneOf(Object.keys(keypadTypes)),
    },

    render() {
        // Select the appropriate keyboard given the type.
        // TODO(charlie): In the future, we might want to move towards a
        // data-driven approach to defining keyboard layouts, and have a
        // generic keyboard that takes some "keyboard data" and renders it.
        // However, the keyboards differ pretty heavily right now and it's not
        // clear what that format would look like exactly. Plus, there aren't
        // very many of them. So to keep us moving, we'll just hardcode.
        if (this.props.keypadType === keypadTypes.NUMBER) {
            return <NumberKeypad />;
        } else if (this.props.keypadType === keypadTypes.FRACTION) {
            return <FractionKeypad />;
        } else {
            // TODO(charlie): Add in both variants of the Expression keypad.
            return <DefaultKeypad />;
        }
    },
});

const mapStateToProps = (state) => {
    return { keypadType: state.keypadType };
};

module.exports = connect(mapStateToProps)(MathKeypad);
