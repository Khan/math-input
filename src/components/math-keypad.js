const React = require('react');
const { connect } = require('react-redux');

const DefaultKeypad = require('./default-keypad');
const NumberKeypad = require('./number-keypad');
const FractionKeypad = require('./fraction-keypad');
const AdvancedExpressionKeypad = require('./advanced-expression-keypad');
const TestPopoverKeypad = require('./test-popover-keypad');

const ButtonProps = require('./button-props');
const { keypadTypes } = require('../consts');

const MathKeypad = React.createClass({
    propTypes: {
        configuration: React.PropTypes.shape({
            extraSymbols: React.PropTypes.arrayOf(React.PropTypes.string),
            keypadType: React.PropTypes.oneOf(Object.keys(keypadTypes)),
        }),
        page: React.PropTypes.number,
    },

    render() {
        // Select the appropriate keyboard given the type.
        // TODO(charlie): In the future, we might want to move towards a
        // data-driven approach to defining keyboard layouts, and have a
        // generic keyboard that takes some "keyboard data" and renders it.
        // However, the keyboards differ pretty heavily right now and it's not
        // clear what that format would look like exactly. Plus, there aren't
        // very many of them. So to keep us moving, we'll just hardcode.
        switch (this.props.configuration.keypadType) {
            case keypadTypes.NUMBER:
                return <NumberKeypad />;

            case keypadTypes.FRACTION:
                return <FractionKeypad />;

            case keypadTypes.ADVANCED_EXPRESSION:
                const page = this.props.page;
                const extraKeys = this.props.configuration.extraSymbols.map(
                    symbol => ButtonProps[symbol]
                );
                return <AdvancedExpressionKeypad
                    page={page}
                    extraKeys={extraKeys}
                />;

            case keypadTypes.TEST_POPOVER:
                return <TestPopoverKeypad />;

            case keypadTypes.DEFAULT:
            default:
                return <DefaultKeypad />;
        }
    },
});

const mapStateToProps = (state) => {
    return state.keypad;
};

module.exports = connect(mapStateToProps)(MathKeypad);
