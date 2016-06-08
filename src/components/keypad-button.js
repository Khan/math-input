/**
 * A component that renders a keypad button.
 */

const React = require('react');
const { connect } = require('react-redux');

const { StyleSheet } = require('aphrodite');
const { View } = require('../fake-react-native-web');
const Icon = require('./icon');
const MultiSymbolGrid = require('./multi-symbol-grid');
const CornerDecal = require('./corner-decal');
const { KeyTypes, BorderDirections, BorderStyles } = require('../consts');
const {
    brightGreen,
    buttonBorderColor,
    buttonBorderStyle,
    buttonBorderWidthPx,
    numeralGrey,
    commandGrey,
    controlGrey,
    emptyGrey,
} = require('./common-style');
const {
    keyConfigPropType,
    bordersPropType,
    unicodeSymbolPropType,
} = require('./prop-types');

const KeypadButton = React.createClass({
    propTypes: {
        ariaLabel: React.PropTypes.string,
        // The borders to display on the button. Typically, this should be set
        // using one of the preset `BorderStyles` options.
        borders: bordersPropType,
        buttonHeightPx: React.PropTypes.number.isRequired,
        // Any additional keys that can be accessed by long-pressing on the
        // button.
        childKeys: React.PropTypes.arrayOf(keyConfigPropType),
        // Whether the button should be rendered in a 'disabled' state, i.e.,
        // without any touch feedback.
        disabled: React.PropTypes.bool,
        focused: React.PropTypes.bool,
        // The name of the button, used to select the appropriate SVG
        // background image.
        name: React.PropTypes.string,
        onTouchCancel: React.PropTypes.func,
        onTouchEnd: React.PropTypes.func,
        onTouchMove: React.PropTypes.func,
        onTouchStart: React.PropTypes.func,
        popoverEnabled: React.PropTypes.bool,
        style: React.PropTypes.any,
        type: React.PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
        // The unicode symbol that can be used to depict the icon for the
        // button, as a fall-back in case there is no SVG icon available.
        unicodeSymbol: unicodeSymbolPropType,
    },

    getDefaultProps() {
        return {
            borders: BorderStyles.ALL,
            childKeys: [],
            disabled: false,
            focused: false,
            popoverEnabled: false,
        };
    },

    componentWillMount() {
        this.heightStyles = stylesForButtonHeightPx(this.props.buttonHeightPx);
    },

    componentWillUpdate(newProps, newState) {
        // Only recompute the Aphrodite StyleSheet when the button height has
        // changed. Though it is safe to recompute the StyleSheet (since
        // they're content-addressable), it saves us a bunch of hashing and
        // other work to cache it here.
        if (newProps.buttonHeightPx !== this.props.buttonHeightPx) {
            this.heightStyles = stylesForButtonHeightPx(
                newProps.buttonHeightPx
            );
        }
    },

    _getFocusStyle(type) {
        let focusBackgroundStyle;
        if (type === KeyTypes.INPUT_NAVIGATION ||
                type === KeyTypes.KEYPAD_NAVIGATION) {
            focusBackgroundStyle = styles.light;
        } else {
            focusBackgroundStyle = styles.bright;
        }

        return [styles.focusBox, focusBackgroundStyle];
    },

    _getButtonStyle(type, borders, style) {
        // Select the appropriate style for the button.
        let backgroundStyle;
        switch (type) {
            case KeyTypes.EMPTY:
                backgroundStyle = styles.empty;
                break;

            case KeyTypes.NUMERAL:
                backgroundStyle = styles.numeral;
                break;

            case KeyTypes.MANY:
            case KeyTypes.MATH:
                backgroundStyle = styles.command;
                break;

            case KeyTypes.INPUT_NAVIGATION:
            case KeyTypes.KEYPAD_NAVIGATION:
                backgroundStyle = styles.control;
                break;

            case KeyTypes.ECHO:
                backgroundStyle = null;
                break;
        }

        const borderStyle = [];
        if (borders.indexOf(BorderDirections.LEFT) !== -1) {
            borderStyle.push(styles.leftBorder);
        }
        if (borders.indexOf(BorderDirections.BOTTOM) !== -1) {
            borderStyle.push(styles.bottomBorder);
        }

        return [
            styles.buttonBase,
            backgroundStyle,
            ...borderStyle,
            type === KeyTypes.ECHO && styles.echo,
            this.heightStyles.fullHeight,
            // React Native allows you to set the 'style' props on user defined
            // components, https://facebook.github.io/react-native/docs/style.html
            ...(Array.isArray(style) ? style : [style]),
        ];
    },

    render() {
        const {
            ariaLabel,
            borders,
            childKeys,
            disabled,
            focused,
            name,
            onTouchCancel,
            onTouchEnd,
            onTouchMove,
            onTouchStart,
            popoverEnabled,
            style,
            type,
            unicodeSymbol,
        } = this.props;

        // We render in the focus state if the key is focused, or if it's an
        // echo.
        const renderFocused = !disabled && focused || popoverEnabled ||
            type === KeyTypes.ECHO;
        const buttonStyle = this._getButtonStyle(type, borders, style);
        const focusStyle = this._getFocusStyle(type);
        const iconWrapperStyle = (renderFocused && focusStyle) ||
            (disabled && styles.disabled);

        const eventHandlers = {
            onTouchCancel, onTouchEnd, onTouchMove, onTouchStart,
        };

        const maybeCornerDecal = !renderFocused && childKeys &&
            childKeys.length > 0 && <CornerDecal />;

        if (type === KeyTypes.EMPTY) {
            return <View style={buttonStyle} {...eventHandlers} />;
        } else if (type === KeyTypes.MANY) {
            // TODO(charlie): Make the long-press interaction accessible. See
            // the TODO in key-configs.js for more.
            const manyButtonA11yMarkup = {
                role: 'button',
                ariaLabel: childKeys[0].ariaLabel,
            };
            const unicodeSymbols = childKeys.map(keyConfig => {
                return keyConfig.unicodeSymbol;
            });
            return <View
                style={buttonStyle}
                {...eventHandlers}
                {...manyButtonA11yMarkup}
            >
                <View style={iconWrapperStyle}>
                    <MultiSymbolGrid
                        unicodeSymbols={unicodeSymbols}
                        focused={renderFocused}
                    />
                </View>
                {maybeCornerDecal}
            </View>;
        } else {
            const a11yMarkup = {
                role: 'button',
                ariaLabel: ariaLabel,
            };

            return <View style={buttonStyle} {...eventHandlers} {...a11yMarkup}>
                <View style={iconWrapperStyle}>
                    <Icon
                        name={name}
                        unicodeSymbol={unicodeSymbol}
                        focused={renderFocused}
                    />
                </View>
                {maybeCornerDecal}
            </View>;
        }
    },
});

const focusInsetPx = 4;

const styles = StyleSheet.create({
    buttonBase: {
        width: '100%',
        flexDirection: 'row',
        cursor: 'pointer',
        // Make the text unselectable
        userSelect: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        // Borders are made selectively visible.
        borderColor: buttonBorderColor,
        borderStyle: buttonBorderStyle,
        // The focus state is inset slightly from the edge of the button.
        padding: focusInsetPx,
    },

    // Overrides for the echo state, where we want to render the borders for
    // layout purposes, but we don't want them to be visible.
    echo: {
        borderColor: 'transparent',
    },

    // Background colors and other base styles that may vary between key types.
    numeral: {
        backgroundColor: numeralGrey,
    },
    command: {
        backgroundColor: commandGrey,
    },
    control: {
        backgroundColor: controlGrey,
    },
    empty: {
        backgroundColor: emptyGrey,
        cursor: 'default',
    },

    focusBox: {
        width: '100%',
        height: '100%',
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bright: {
        backgroundColor: brightGreen,
    },
    light: {
        backgroundColor: 'rgba(33, 36, 44, 0.1)',
    },

    disabled: {
        opacity: 0.3,
    },

    // Styles used to render the appropriate borders. Buttons are only allowed
    // to render left and bottom borders, to simplify layout.
    leftBorder: {
        borderLeftWidth: buttonBorderWidthPx,
    },
    bottomBorder: {
        borderBottomWidth: buttonBorderWidthPx,
    },
});

const stylesForButtonHeightPx = (buttonHeightPx) => {
    return StyleSheet.create({
        fullHeight: {
            height: buttonHeightPx,
        },
    });
};

const mapStateToProps = (state) => {
    return state.buttons;
};

module.exports = connect(mapStateToProps)(KeypadButton);
