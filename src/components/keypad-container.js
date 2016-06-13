const React = require('react');
const { connect } = require('react-redux');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const DefaultKeypad = require('./default-keypad');
const NumberKeypad = require('./number-keypad');
const FractionKeypad = require('./fraction-keypad');
const BasicExpressionKeypad = require('./basic-expression-keypad');
const AdvancedExpressionKeypad = require('./advanced-expression-keypad');
const zIndexes = require('./input/z-indexes');
const { getButtonHeightPx } = require('./common-style');
const { setButtonHeightPx } = require('../actions');
const { keyIdPropType } = require('./prop-types');
const { KeypadTypes } = require('../consts');

const KeypadContainer = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        keypadType: React.PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
        onButtonHeightPxChange: React.PropTypes.func.isRequired,
        onDismiss: React.PropTypes.func,
        // A callback that should be triggered with the root React element on
        // mount.
        onElementMounted: React.PropTypes.func,
    },

    componentDidMount() {
        // Relay the initial button height.
        this.props.onButtonHeightPxChange(getButtonHeightPx());

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

                // Notify that the button height has changed.
                this.props.onButtonHeightPxChange(getButtonHeightPx());
            }, 66);
        }
    },

    renderKeypad() {
        // Extract props that some keypads will need.
        const { extraKeys, keypadType, onElementMounted } = this.props;

        // Select the appropriate keyboard given the type.
        // TODO(charlie): In the future, we might want to move towards a
        // data-driven approach to defining keyboard layouts, and have a
        // generic keyboard that takes some "keyboard data" and renders it.
        // However, the keyboards differ pretty heavily right now and it's not
        // clear what that format would look like exactly. Plus, there aren't
        // very many of them. So to keep us moving, we'll just hardcode.
        switch (keypadType) {
            case KeypadTypes.NUMBER:
                return <NumberKeypad ref={onElementMounted} />;

            case KeypadTypes.FRACTION:
                return <FractionKeypad ref={onElementMounted} />;

            case KeypadTypes.ADVANCED_EXPRESSION:
                return <AdvancedExpressionKeypad
                    extraKeys={extraKeys}
                    ref={onElementMounted}
                />;

            case KeypadTypes.BASIC_EXPRESSION:
                return <BasicExpressionKeypad
                    extraKeys={extraKeys}
                    ref={onElementMounted}
                />;

            case KeypadTypes.DEFAULT:
            default:
                return <DefaultKeypad ref={onElementMounted} />;
        }
    },

    render() {
        // NOTE(charlie): We render the transforms as pure inline styles to
        // avoid an Aphrodite bug in mobile Safari.
        //   See: https://github.com/Khan/aphrodite/issues/68.
        const dynamicStyle = this.props.active ? inlineStyles.active
                                               : inlineStyles.hidden;
        return <View style={styles.keypadContainer} dynamicStyle={dynamicStyle}>
            {this.renderKeypad()}
        </View>;
    },
});

const keypadAnimationDurationMs = 300;

const styles = StyleSheet.create({
    keypadContainer: {
        bottom: 0,
        position: 'fixed',
        transition: `${keypadAnimationDurationMs}ms ease-out`,
        transitionProperty: 'transform',
        zIndex: zIndexes.keypad,
    },
});

// Note: these don't go through an autoprefixer/aphrodite.
const inlineStyles = {
    hidden: {
        msTransform: 'translate3d(0, 100%, 0)',
        WebkitTransform: 'translate3d(0, 100%, 0)',
        transform: 'translate3d(0, 100%, 0)',
    },

    active: {
        msTransform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
    },
};

const mapStateToProps = (state) => {
    return state.keypad;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onButtonHeightPxChange: (pageWidthPx) => {
            dispatch(setButtonHeightPx(pageWidthPx));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(KeypadContainer);
