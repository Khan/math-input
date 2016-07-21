const React = require('react');
const {connect} = require('react-redux');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const FractionKeypad = require('./fraction-keypad');
const ExpressionKeypad = require('./expression-keypad');
const NavigationPad = require('./navigation-pad');
const zIndexes = require('./z-indexes');
const {setPageSize} = require('../actions');
const {keyIdPropType} = require('./prop-types');
const {KeypadTypes, LayoutModes} = require('../consts');
const {row, centered, fullWidth} = require('./styles');
const {compactKeypadBorderRadiusPx} = require('./common-style');

const KeypadContainer = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        keypadType: React.PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
        layoutMode: React.PropTypes.oneOf(Object.keys(LayoutModes)).isRequired,
        navigationPadEnabled: React.PropTypes.bool.isRequired,
        onDismiss: React.PropTypes.func,
        // A callback that should be triggered with the root React element on
        // mount.
        onElementMounted: React.PropTypes.func,
        onPageSizeChange: React.PropTypes.func.isRequired,
        style: React.PropTypes.any,
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

        this.props.onPageSizeChange(window.innerWidth, window.innerHeight);
    },

    renderKeypad() {
        const {
            extraKeys,
            keypadType,
            layoutMode,
            navigationPadEnabled,
        } = this.props;

        const keypadProps = {
            extraKeys,
            // HACK(charlie): In order to properly round the corners of the
            // compact keypad, we need to instruct some of our child views to
            // crop themselves. At least we're colocating all the layout
            // information in this component, though.
            roundTopLeft: layoutMode === LayoutModes.COMPACT &&
                !navigationPadEnabled,
            roundTopRight: layoutMode === LayoutModes.COMPACT,
        };

        // Select the appropriate keyboard given the type.
        // TODO(charlie): In the future, we might want to move towards a
        // data-driven approach to defining keyboard layouts, and have a
        // generic keyboard that takes some "keyboard data" and renders it.
        // However, the keyboards differ pretty heavily right now and it's not
        // clear what that format would look like exactly. Plus, there aren't
        // very many of them. So to keep us moving, we'll just hardcode.
        switch (keypadType) {
            case KeypadTypes.FRACTION:
                return <FractionKeypad {...keypadProps} />;

            case KeypadTypes.EXPRESSION:
                return <ExpressionKeypad {...keypadProps} />;

            default:
                throw new Error("Invalid keypad type: " + keypadType);
        }
    },

    render() {
        const {
            active,
            layoutMode,
            navigationPadEnabled,
            onElementMounted,
            style,
        } = this.props;

        // NOTE(charlie): We render the transforms as pure inline styles to
        // avoid an Aphrodite bug in mobile Safari.
        //   See: https://github.com/Khan/aphrodite/issues/68.
        const dynamicStyle = active ? inlineStyles.active : inlineStyles.hidden;

        const keypadContainerStyle = [
            row,
            centered,
            fullWidth,
            styles.keypadContainer,
            ...(Array.isArray(style) ? style : [style]),
        ];

        const keypadStyle = [
            row,
            styles.keypadBorder,
            layoutMode === LayoutModes.FULLSCREEN ? styles.fullscreen
                                                  : styles.compact,
        ];

        // TODO(charlie): When the keypad is shorter than the width of the
        // screen, add a border on its left and right edges, and round out the
        // corners.
        return <View
            style={keypadContainerStyle}
            dynamicStyle={dynamicStyle}
            ref={onElementMounted}
        >
            <View style={keypadStyle}>
                {navigationPadEnabled &&
                    <NavigationPad
                        roundTopLeft={layoutMode === LayoutModes.COMPACT}
                    />
                }
                <View style={styles.keypadLayout}>
                    {this.renderKeypad()}
                </View>
            </View>
        </View>;
    },
});

const keypadAnimationDurationMs = 300;
const borderWidthPx = 0.5;

const styles = StyleSheet.create({
    keypadContainer: {
        bottom: 0,
        position: 'fixed',
        width: '100%',
        transition: `${keypadAnimationDurationMs}ms ease-out`,
        transitionProperty: 'transform',
        zIndex: zIndexes.keypad,
    },

    keypadBorder: {
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderStyle: 'solid',
    },

    fullscreen: {
        borderTopWidth: borderWidthPx,
    },

    compact: {
        borderTopRightRadius: compactKeypadBorderRadiusPx,
        borderTopLeftRadius: compactKeypadBorderRadiusPx,

        borderTopWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
    },

    // Defer to the navigation pad, such that the navigation pad is always
    // rendered at full-width, and the keypad takes up just the remaining space.
    // TODO(charlie): Avoid shrinking the keys and, instead, make the keypad
    // scrollable.
    keypadLayout: {
        flexGrow: 1,
        // Avoid unitless flex-basis, per: https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
        flexBasis: '0%',
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
    return {
        ...state.keypad,
        layoutMode: state.layout.layoutMode,
        navigationPadEnabled: state.layout.navigationPadEnabled,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPageSizeChange: (pageWidthPx, pageHeightPx) => {
            dispatch(setPageSize(pageWidthPx, pageHeightPx));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(KeypadContainer);
