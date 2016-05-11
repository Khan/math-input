const React = require('react');
const { connect } = require('react-redux');

const DefaultKeypad = require('./default-keypad');
const NumberKeypad = require('./number-keypad');
const FractionKeypad = require('./fraction-keypad');
const BasicExpressionKeypad = require('./basic-expression-keypad');
const Dismissable = require('./dismissable');
const AdvancedExpressionKeypad = require('./advanced-expression-keypad');
const { getButtonHeightPx } = require('./common-style');
const { setButtonHeightPx } = require('../actions');
const { keyIdPropType } = require('./prop-types');
const { keypadTypes } = require('../consts');

const MathKeypad = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        keypadType: React.PropTypes.oneOf(Object.keys(keypadTypes)).isRequired,
        onDismiss: React.PropTypes.func,
    },

    componentDidMount() {
        // Relay the initial button height to the system.
        setButtonHeightPx(getButtonHeightPx());

        // And update it on resize.
        window.addEventListener("resize", this._onResize);
    },

    componentDidUpdate(prevProps) {
        if (prevProps.active && !this.props.active) {
            this.props.onDismiss && this.props.onDismiss();
        }
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
        if (this._resizeTimeout == null) {
            this._resizeTimeout = setTimeout(() => {
                this._resizeTimeout = null;

                // Notify the store that the button height has changed.
                setButtonHeightPx(getButtonHeightPx());
            }, 66);
        }
    },

    renderKeypad() {
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

    render() {
        const { active } = this.props;

        return <Dismissable active={active} id='keypad'>
            {this.renderKeypad()}
        </Dismissable>;
    },
});

const mapStateToProps = (state) => {
    return state.keypad;
};

module.exports = connect(mapStateToProps)(MathKeypad);
