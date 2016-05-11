/**
 * A grid of symbols, rendered as text and positioned based on the number of
 * symbols provided. Up to four symbols will be shown.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { Text, View } = require('../fake-react-native-web');
const UnicodeIcon = require('./unicode-icon');
const { row, column, centered, fullWidth } = require('./styles');
const {
    iconGrey, secondaryIconOpacity, iconSizeHeightPx, iconSizeWidthPx,
} = require('./common-style');

const MultiSymbolGrid = React.createClass({
    propTypes: {
        focused: React.PropTypes.bool,
        unicodeSymbols: React.PropTypes.arrayOf(
            React.PropTypes.string
        ).isRequired,
    },

    render() {
        const { focused, unicodeSymbols } = this.props;

        if (unicodeSymbols.length === 1) {
            return <UnicodeIcon unicodeSymbol={unicodeSymbols[0]} />;
        } else {
            const primaryIconStyle = [
                styles.iconFont,
                styles.primaryIcon,
                focused && styles.focused,
            ];
            const secondaryIconStyle = [
                styles.iconFont,
                styles.secondaryIcon,
                focused && styles.focused,
            ];

            if (unicodeSymbols.length === 2) {
                return <View style={[row, styles.iconSize]}>
                    <View style={[column, centered, fullWidth]}>
                        <Text style={primaryIconStyle}>
                            {unicodeSymbols[0]}
                        </Text>
                    </View>
                    <View style={[column, centered, fullWidth]}>
                        <Text style={secondaryIconStyle}>
                            {unicodeSymbols[1]}
                        </Text>
                    </View>
                </View>;
            } else if (unicodeSymbols.length >= 3) {
                return <View style={[
                    column,
                    styles.iconSize,
                    styles.fourQuadrantGrid,
                ]}
                >
                    <View style={row}>
                        <View style={[centered, fullWidth]}>
                            <Text style={primaryIconStyle}>
                                {unicodeSymbols[0]}
                            </Text>
                        </View>
                        <View style={[centered, fullWidth]}>
                            <Text style={secondaryIconStyle}>
                                {unicodeSymbols[1]}
                            </Text>
                        </View>
                    </View>
                    <View style={row}>
                        <View style={[centered, fullWidth]}>
                            <Text style={secondaryIconStyle}>
                                {unicodeSymbols[2]}
                            </Text>
                        </View>
                        <View style={[centered, fullWidth]}>
                            <Text style={secondaryIconStyle}>
                                {unicodeSymbols[3]}
                            </Text>
                        </View>
                    </View>
                </View>;
            }
        }

        throw new Error("Invalid number of symbols:", unicodeSymbols.length);
    },
});

const fourQuadrantGridVerticalPaddingPx = 4;

const styles = StyleSheet.create({
    iconSize: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx,
    },
    fourQuadrantGrid: {
        paddingTop: fourQuadrantGridVerticalPaddingPx,
        paddingBottom: fourQuadrantGridVerticalPaddingPx,
    },

    iconFont: {
        fontFamily: 'Proxima Nova Semibold',
        fontStyle: 'italic',
        fontSize: 18,
    },
    // TODO(charlie): Make the SVG icons import these defaults from
    // common-style.
    primaryIcon: {
        color: iconGrey,
    },
    secondaryIcon: {
        color: iconGrey,
        opacity: secondaryIconOpacity,
    },

    focused: {
        color: '#FFF',
    },
});

module.exports = MultiSymbolGrid;
