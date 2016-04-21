/**
 * A component that renders a keypad button, which consists of a primary key
 * that will always be displayed and trigger on click, as well as an optional
 * set of secondary keys that can be revealed through a long press.
 */

const React = require('React');

const { StyleSheet } = require('aphrodite');
const { Text, View } = require('../fake-react-native-web');
const CornerDecal = require('./corner-decal');

const keyPropType = React.PropTypes.shape({
    onClick: React.PropTypes.func,
    label: React.PropTypes.string,
});

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

        const hasSecondaryKeys = secondaryKeys.length > 0;
        if (!hasSecondaryKeys || !showAllSymbols) {
            const fullRowStyle = [
                styles.fullRowColumn,
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
                styles.primaryColumn,
                styles.primaryText,
            ];

            const secondaryStyle = [
                styles.secondaryColumn,
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
const buttonHeightPx = 44;

const styles = StyleSheet.create({
    primaryColumn: {
        width: '100%',
        textAlign: 'right',
        marginRight: gapWidthPx,
    },
    primaryText: {
        fontFamily: 'sans-serif',
        fontSize: 24,
    },

    secondaryColumn: {
        width: '100%',
        height: buttonHeightPx / 2,
        lineHeight: `${buttonHeightPx / 2}px`,
        flexDirection: 'column',
        textAlign: 'left',
        marginLeft: gapWidthPx,
    },
    secondaryText: {
        fontFamily: 'sans-serif',
        fontSize: 12,
        color: 'grey',
    },

    fullRowColumn: {
        width: '100%',
        textAlign: 'center',
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
    },
});

module.exports = KeypadButton;
