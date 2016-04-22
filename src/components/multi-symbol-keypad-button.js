/**
 * A component that renders a keypad button that displays multiple different
 * symbols.
 */

const React = require('React');

const { StyleSheet } = require('aphrodite');
const { Text, View } = require('../fake-react-native-web');
const CornerDecal = require('./corner-decal');

const { row } = require('./styles');

const MultiSymbolKeypadButton = React.createClass({
    propTypes: {
        // An array of keys, where the first element is the "primary" key
        keys: React.PropTypes.arrayOf(React.PropTypes.shape({
            onClick: React.PropTypes.func,
            label: React.PropTypes.string,
        })),
        // Whether to show all (three) of the symbols, or only the symbol that
        // corresponds to the "primary" key
        showAllSymbols: React.PropTypes.bool,
        style: React.PropTypes.any,
    },

    render() {
        const buttonStyle = [
            styles.button,
            // React Native allows you to set the 'style' props on user defined
            // components, https://facebook.github.io/react-native/docs/style.html
            ...(Array.isArray(this.props.style) ? this.props.style
                                                : [this.props.style]),
            // Explicitly set the outer View to use row-style Flexbox
            row,
        ];

        if (this.props.showAllSymbols) {
            const primaryStyle = [
                styles.primaryColumn,
                styles.primaryText,
            ];

            const secondaryStyle = [
                styles.secondaryColumn,
                styles.secondaryText,
            ];

            // Show up to three keys.
            const [primaryKey, ...secondaryKeys] = this.props.keys;
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
        } else {
            const fullRowStyle = [
                styles.fullRowColumn,
                styles.primaryText,
            ];

            // Only show the "default" key.
            // TODO(charlie): Reuse KeypadButton for this purpose, once we've
            // refined some of the styles. Currently, things don't render quite
            // as you'd expect.
            const defaultKey = this.props.keys[0];
            return <View style={buttonStyle} onClick={defaultKey.onClick}>
                <Text style={fullRowStyle}>
                    {defaultKey.label}
                </Text>
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
});

module.exports = MultiSymbolKeypadButton;
