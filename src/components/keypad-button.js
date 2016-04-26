/**
 * A component that renders a keypad button, which consists of a primary key
 * that will always be displayed and trigger on click, as well as an optional
 * set of secondary keys that can be revealed through a long press.
 */

const React = require('react');
const { connect } = require('react-redux');

const { StyleSheet } = require('aphrodite');
const { Text, View } = require('../fake-react-native-web');
const {
    buttonFontSizePrimary,
    buttonFontSizeSecondary,
} = require('./common-style');
const CornerDecal = require('./corner-decal');

const { keyTypes } = require('../consts');
const { keyPropType } = require('./prop-types');

const KeypadButton = React.createClass({
    propTypes: {
        buttonHeightPx: React.PropTypes.number.isRequired,
        primaryKey: keyPropType,
        // Any additional keys that can be accessed by long-pressing on the key
        // and may optionally be displayed alongside the primary key.
        secondaryKeys: React.PropTypes.arrayOf(keyPropType),
        // Whether to show all (up to three) of the secondary key symbols, or
        // only the symbol that corresponds to the primary key.
        showAllSymbols: React.PropTypes.bool,
        style: React.PropTypes.any,
    },

    getDefaultProps() {
        return {
            secondaryKeys: [],
            showAllSymbols: true,
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

    _getButtonStyle(primaryKey, secondaryKeys, style) {
        const hasPrimaryKey = primaryKey != null;
        const hasSecondaryKeys = secondaryKeys.length > 0;

        // Select the appropriate style for the button, based on the
        // combination of primary and secondary keys.
        let backgroundStyle;
        let borderStyle;
        if (!hasPrimaryKey) {
            if (hasSecondaryKeys) {
                backgroundStyle = styles.command;
                borderStyle = styles.bordered;
            } else {
                backgroundStyle = styles.disabled;
                borderStyle = styles.bordered;
            }
        } else {
            switch (primaryKey.type) {
                case keyTypes.NUMERAL:
                    backgroundStyle = styles.numeral;
                    borderStyle = null;
                    break;

                case keyTypes.MATH:
                    backgroundStyle = styles.command;
                    borderStyle = styles.bordered;
                    break;

                case keyTypes.INPUT_NAVIGATION:
                case keyTypes.KEYPAD_NAVIGATION:
                    backgroundStyle = styles.control;
                    borderStyle = null;
                    break;
            }
        }

        return [
            styles.buttonBase,
            backgroundStyle,
            borderStyle,
            this.heightStyles.fullHeight,
            // React Native allows you to set the 'style' props on user defined
            // components, https://facebook.github.io/react-native/docs/style.html
            ...(Array.isArray(style) ? style : [style]),
        ];
    },

    render() {
        const {
            primaryKey, secondaryKeys, showAllSymbols, style,
        } = this.props;

        const buttonStyle = this._getButtonStyle(
            primaryKey, secondaryKeys, style
        );

        const hasPrimaryKey = primaryKey != null;
        const hasSecondaryKeys = secondaryKeys.length > 0;

        if (!hasPrimaryKey && !hasSecondaryKeys) {
            return <View style={buttonStyle} />;
        } else if (!hasPrimaryKey) {
            const leftColumnStyle = [
                styles.leftColumn,
                styles.secondaryText,
            ];
            const rightColumnStyle = [
                styles.rightColumn,
                styles.secondaryText,
            ];

            // If we have no primary key, then we show up to four keys, in a
            // two-column layout.
            const maxKeysPerColumn = 2;
            return <View style={buttonStyle}>
                <View style={leftColumnStyle}>
                    {secondaryKeys.slice(0, maxKeysPerColumn).map(key =>
                        <View><Text>{key.label}</Text></View>
                    )}
                </View>
                <View style={rightColumnStyle}>
                    {secondaryKeys.slice(
                        maxKeysPerColumn, 2 * maxKeysPerColumn
                    ).map(key => <Text>{key.label}</Text>)}
                </View>
                <CornerDecal />
            </View>;
        } else if (!hasSecondaryKeys || !showAllSymbols) {
            const fullRowStyle = [
                styles.centerColumn,
                styles.primaryText,
            ];

            // If there are no secondary keys, or we're not supposed to show
            // the secondary symbols, then we render the primary symbol across
            // the entirety of the button.
            return <View style={buttonStyle} onClick={primaryKey.onClick}>
                <Text style={fullRowStyle}>
                    {primaryKey.label}
                </Text>
                {hasSecondaryKeys && <CornerDecal />}
            </View>;
        } else {
            const primaryStyle = [
                styles.leftColumn,
                styles.primaryText,
            ];

            const secondaryStyle = [
                styles.rightColumn,
                styles.secondaryText,
            ];

            // Otherwise, we show up to three keys, in a two-column layout.
            const maxSecondaryKeys = 2;
            return <View style={buttonStyle} onClick={primaryKey.onClick}>
                <View style={primaryStyle}>
                    <Text>{primaryKey.label}</Text>
                </View>
                <View style={secondaryStyle}>
                    {secondaryKeys.slice(0, maxSecondaryKeys).map(key =>
                        <Text>{key.label}</Text>
                    )}
                </View>
                <CornerDecal />
            </View>;
        }
    },
});

const gapWidthPx = 5;

const styles = StyleSheet.create({
    centerColumn: {
        width: '100%',
        flexDirection: 'column',
        textAlign: 'center',
    },
    leftColumn: {
        width: '100%',
        flexDirection: 'column',
        textAlign: 'right',
        marginRight: gapWidthPx,
    },
    rightColumn: {
        width: '100%',
        flexDirection: 'column',
        textAlign: 'left',
        marginLeft: gapWidthPx,
    },

    primaryText: {
        fontFamily: 'sans-serif',
        fontSize: buttonFontSizePrimary,
    },
    secondaryText: {
        fontFamily: 'sans-serif',
        fontSize: buttonFontSizeSecondary,
        color: 'grey',
    },

    buttonBase: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        // Make the text unselectable
        userSelect: 'none',
    },

    // TODO(charlie): This causes layout weirdness where borders get
    // double-drawn and the margins are off in some places. We need to properly
    // figure out borders, which may require conditional borders being
    // specified as props.
    bordered: {
        borderColor: '#ECECEC',
        borderStyle: 'solid',
        borderWidth: 1,
    },

    // Background colors and other base styles that may vary between key types.
    numeral: {
        backgroundColor: '#FFF',
    },
    command: {
        backgroundColor: '#FAFAFA',
    },
    control: {
        backgroundColor: '#F7F7F7',
    },
    disabled: {
        backgroundColor: '#F0F0F0',
        cursor: 'default',
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
