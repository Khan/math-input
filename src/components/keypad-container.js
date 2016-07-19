const React = require('react');
const {connect} = require('react-redux');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const NumberKeypad = require('./number-keypad');
const FractionKeypad = require('./fraction-keypad');
const ExpressionKeypad = require('./expression-keypad');
const zIndexes = require('./z-indexes');
const {setScreenSize} = require('../actions');
const {keyIdPropType} = require('./prop-types');
const {KeypadTypes} = require('../consts');

const KeypadContainer = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        keypadType: React.PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
        onDismiss: React.PropTypes.func,
        // A callback that should be triggered with the root React element on
        // mount.
        onElementMounted: React.PropTypes.func,
        onScreenSizeChange: React.PropTypes.func.isRequired,
    },

    getInitialState() {
        // Use (partially unsupported) viewport units until componentDidMount.
        // It's okay to use the viewport units since they'll be overridden as
        // soon as the JavaScript kicks in.
        return {
            viewportWidth: "100vw",
        };
    },

    componentDidMount() {
        // Relay the initial size metrics.
        this._onResize();

        // And update it on resize.
        window.addEventListener("resize", this._throttleResizeHandler);
        window.addEventListener(
            "orientationchange", this._throttleResizeHandler
        );
    },

    componentDidUpdate(prevProps) {
        if (prevProps.active && !this.props.active) {
            this.props.onDismiss && this.props.onDismiss();
        }
    },

    componentWillUnmount() {
        window.removeEventListener("resize", this._throttleResizeHandler);
        window.removeEventListener(
            "orientationchange", this._throttleResizeHandler
        );
    },

    _throttleResizeHandler() {
        // Throttle the resize callbacks.
        // https://developer.mozilla.org/en-US/docs/Web/Events/resize
        if (this._resizeTimeout == null) {
            this._resizeTimeout = setTimeout(() => {
                this._resizeTimeout = null;

                this._onResize();
            }, 66);
        }
    },

    _onResize() {
        // Whenever the page resizes, we need to force an update, as the button
        // heights and keypad width are computed based on horizontal space.
        this.setState({
            viewportWidth: window.innerWidth,
        });

        this.props.onScreenSizeChange(window.innerWidth, window.innerHeight);
    },

    renderKeypad() {
        // Extract props that some keypads will need.
        const {extraKeys, keypadType, onElementMounted} = this.props;

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

            case KeypadTypes.EXPRESSION:
                return <ExpressionKeypad
                    extraKeys={extraKeys}
                    ref={onElementMounted}
                />;

            default:
                throw new Error("Invalid keypad type: " + keypadType);
        }
    },

    render() {
        // NOTE(charlie): We render the transforms as pure inline styles to
        // avoid an Aphrodite bug in mobile Safari.
        //   See: https://github.com/Khan/aphrodite/issues/68.
        const dynamicStyle = this.props.active ? inlineStyles.active
                                               : inlineStyles.hidden;

        // TODO(charlie): When the keypad is shorter than the width of the
        // screen, add a border on its left and right edges, and round out the
        // corners.
        return <View style={styles.keypadContainer} dynamicStyle={dynamicStyle}>
            <View style={styles.spacer} />
            <View style={styles.content}>
                {this.renderKeypad()}
            </View>
            <View style={styles.spacer} />
        </View>;
    },
});

const keypadAnimationDurationMs = 300;

const styles = StyleSheet.create({
    keypadContainer: {
        borderTop: '1px solid rgba(0, 0, 0, 0.2)',
        bottom: 0,
        position: 'fixed',
        transition: `${keypadAnimationDurationMs}ms ease-out`,
        transitionProperty: 'transform',
        width: '100%',
        zIndex: zIndexes.keypad,
        flexDirection: 'row',
    },
    content: {
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderStyle: 'solid',
        borderWidth: '0 1px',
    },
    spacer: {
        flex: 1,
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
        onScreenSizeChange: (pageWidthPx, pageHeightPx) => {
            dispatch(setScreenSize(pageWidthPx, pageHeightPx));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(KeypadContainer);
