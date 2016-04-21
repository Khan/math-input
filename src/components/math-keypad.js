const React = require('react');
const { connect } = require('react-redux');

const DefaultKeypad = require('./default-keypad');
const NumberKeypad = require('./number-keypad');
const FractionKeypad = require('./fraction-keypad');
const TestMultiButtonKeypad = require('./test-multi-button-keypad');
const TestMultiPageKeypad = require('./test-multi-page-keypad');

const { keypadTypes } = require('../consts');

const MathKeypad = React.createClass({
    propTypes: {
        page: React.PropTypes.number,
        type: React.PropTypes.oneOf(Object.keys(keypadTypes)),
    },

    render() {
        // Select the appropriate keyboard given the type.
        // TODO(charlie): In the future, we might want to move towards a
        // data-driven approach to defining keyboard layouts, and have a
        // generic keyboard that takes some "keyboard data" and renders it.
        // However, the keyboards differ pretty heavily right now and it's not
        // clear what that format would look like exactly. Plus, there aren't
        // very many of them. So to keep us moving, we'll just hardcode.
        switch (this.props.type) {
            case keypadTypes.NUMBER:
                return <NumberKeypad {...this.props} />;

            case keypadTypes.FRACTION:
                return <FractionKeypad {...this.props} />;

            case keypadTypes.TEST_MULTI_BUTTON:
                return <TestMultiButtonKeypad {...this.props} />;

            case keypadTypes.TEST_MULTI_PAGE:
                return <TestMultiPageKeypad {...this.props} />;

            case keypadTypes.DEFAULT:
            default:
                return <DefaultKeypad {...this.props} />;
        }
    },
});

const mapStateToProps = (state) => {
    return state.keypad;
};

module.exports = connect(mapStateToProps)(MathKeypad);
