const React = require('react');
const { connect } = require('react-redux');

const DefaultKeypad = require('./default-keypad');
const NumberKeypad = require('./number-keypad');
const FractionKeypad = require('./fraction-keypad');
const BasicExpressionKeypad = require('./basic-expression-keypad');
const AdvancedExpressionKeypad = require('./advanced-expression-keypad');
const { getButtonHeightPx } = require('./common-style');
const { setButtonHeightPx } = require('../actions');
const { keyIdPropType } = require('./prop-types');
const { keypadTypes } = require('../consts');

const MathKeypad = React.createClass({
    propTypes: {
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        keypadType: React.PropTypes.oneOf(Object.keys(keypadTypes)),
    },

    componentDidMount() {
        window.addEventListener("resize", this._onResize);
    },

    componentWillUnmount() {
        window.removeEventListener("resize", this._onResize);
    },

    _onResize() {
        // Whenever the page resizes, we need to force an update, as the button
        // heights are computed as a portion of the page width.
        // TODO(charlie): If we decide that we don't need to support Android
        // 4.3, we can achieve this effect trivially using Viewport units.

        // Throttle resize events -- taken from:
        //    https://developer.mozilla.org/en-US/docs/Web/Events/resize
        if (this.resizeTimeout == null) {
            this.resizeTimeout = setTimeout(() => {
                this.resizeTimeout = null;

                // Notify the store that the button height has changed.
                setButtonHeightPx(getButtonHeightPx());
            }, 66);
        }
    },

    render() {
        // Extract props that some keypads will need.
        const { extraKeys, keypadType } = this.props;

        // Select the appropriate keyboard given the type.
        // TODO(charlie): In the future, we might want to move towards a
        // data-driven approach to defining keyboard layouts, and have a
        // generic keyboard that takes some "keyboard data" and renders it.
        // However, the keyboards differ pretty heavily right now and it's not
        // clear what that format would look like exactly. Plus, there aren't
        // very many of them. So to keep us moving, we'll just hardcode.
        switch (keypadType) {
            case keypadTypes.NUMBER:
                return <NumberKeypad />;

            case keypadTypes.FRACTION:
                return <FractionKeypad />;

            case keypadTypes.ADVANCED_EXPRESSION:
                return <AdvancedExpressionKeypad extraKeys={extraKeys} />;

            case keypadTypes.BASIC_EXPRESSION:
                return <BasicExpressionKeypad extraKeys={extraKeys} />;

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
