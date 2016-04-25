/**
 * A component that renders a keypad button, which consists of a primary key
 * that will always be displayed and trigger on click, as well as an optional
 * set of secondary keys that can be revealed through a long press.
 */

const React = require('react');

const { StyleSheet } = require('aphrodite');
const { Text, View } = require('../fake-react-native-web');
const {
    buttonHeightPx,
    buttonFontSizePrimary,
    buttonFontSizeSecondary,
} = require('./common-style');
const CornerDecal = require('./corner-decal');

const { keyPropType } = require('./prop-types');

const KeypadButton = React.createClass({
    propTypes: {
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

    render() {
        const {
            primaryKey, secondaryKeys, showAllSymbols, style,
        } = this.props;

        const buttonStyle = [
            styles.button,
            // React Native allows you to set the 'style' props on user defined
            // components, https://facebook.github.io/react-native/docs/style.html
            ...(Array.isArray(style) ? style : [style]),
        ];

        const hasPrimaryKey = primaryKey != null;
        const hasSecondaryKeys = secondaryKeys.length > 0;

        if (!hasPrimaryKey && !hasSecondaryKeys) {
            return <View style={[...buttonStyle, styles.uninteractable]} />;
        } else if (!hasPrimaryKey) {
            const splitColumnStyle = [
                styles.halfCell,
                styles.secondaryText,
            ];
            const leftColumnStyle = [
                styles.leftColumn,
                ...splitColumnStyle,
            ];
            const rightColumnStyle = [
                styles.rightColumn,
                ...splitColumnStyle,
            ];

            // If we have no primary key, then we show up to four keys, in a
            // two-column layout.
            const maxKeysPerColumn = 2;
            return <View style={buttonStyle}>
                <View style={leftColumnStyle}>
                    {secondaryKeys.slice(0, maxKeysPerColumn).map(key =>
                        <Text>{key.label}</Text>
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
                styles.halfCell,
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
    halfCell: {
        height: buttonHeightPx / 2,
        lineHeight: `${buttonHeightPx / 2}px`,
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

    button: {
        width: '100%',
        flexDirection: 'row',
        height: buttonHeightPx,
        borderColor: '#BBB',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: -1,
        marginRight: -1,
        lineHeight: `${buttonHeightPx}px`,
        textAlign: 'center',
        backgroundColor: '#EEE',
        cursor: 'pointer',
        // Make the text unselectable
        userSelect: 'none',
    },

    uninteractable: {
        cursor: 'default',
    },
});

module.exports = KeypadButton;
