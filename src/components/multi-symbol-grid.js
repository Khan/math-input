/**
 * A grid of symbols, rendered as text and positioned based on the number of
 * symbols provided. Up to four symbols will be shown.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const UnicodeIcon = require('./unicode-icon');
const UnicodeSymbol = require('./unicode-symbol');
const { row, column, centered, fullWidth } = require('./styles');
const {
    iconGrey, secondaryIconOpacity, iconSizeHeightPx, iconSizeWidthPx,
} = require('./common-style');
const { unicodeSymbolPropType } = require('./prop-types');

const MultiSymbolGrid = React.createClass({
    propTypes: {
        focused: React.PropTypes.bool,
        unicodeSymbols: React.PropTypes.arrayOf(
            unicodeSymbolPropType
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
                    <View style={[
                        column, centered, fullWidth, styles.middleLeft,
                    ]}
                    >
                        <UnicodeSymbol
                            style={primaryIconStyle}
                            unicodeSymbol={unicodeSymbols[0]}
                        />
                    </View>
                    <View style={[
                        column, centered, fullWidth, styles.middleRight,
                    ]}
                    >
                        <UnicodeSymbol
                            style={secondaryIconStyle}
                            unicodeSymbol={unicodeSymbols[1]}
                        />
                    </View>
                </View>;
            } else if (unicodeSymbols.length >= 3) {
                return <View style={[column, styles.iconSize]}>
                    <View style={row}>
                        <View style={[centered, fullWidth, styles.topLeft]}>
                            <UnicodeSymbol
                                style={primaryIconStyle}
                                unicodeSymbol={unicodeSymbols[0]}
                            />
                        </View>
                        <View style={[centered, fullWidth, styles.topRight]}>
                            <UnicodeSymbol
                                style={secondaryIconStyle}
                                unicodeSymbol={unicodeSymbols[1]}
                            />
                        </View>
                    </View>
                    <View style={row}>
                        <View style={[centered, fullWidth, styles.bottomLeft]}>
                            <UnicodeSymbol
                                style={secondaryIconStyle}
                                unicodeSymbol={unicodeSymbols[2]}
                            />
                        </View>
                        <View style={[centered, fullWidth, styles.bottomRight]}>
                            {unicodeSymbols[3] && <UnicodeSymbol
                                style={secondaryIconStyle}
                                unicodeSymbol={unicodeSymbols[3]}
                            />}
                        </View>
                    </View>
                </View>;
            }
        }

        throw new Error("Invalid number of symbols:", unicodeSymbols.length);
    },
});

const verticalInsetPx = 2;
const horizontalInsetPx = 4;

const styles = StyleSheet.create({
    iconSize: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx,
    },

    // For the three- and four-icon layouts.
    bottomLeft: {
        marginBottom: verticalInsetPx,
        marginLeft: horizontalInsetPx,
    },
    topLeft: {
        marginTop: verticalInsetPx,
        marginLeft: horizontalInsetPx,
    },
    topRight: {
        marginTop: verticalInsetPx,
        marginRight: horizontalInsetPx,
    },
    bottomRight: {
        marginBottom: verticalInsetPx,
        marginRight: horizontalInsetPx,
    },

    // For the two-icon layout.
    middleLeft: {
        marginLeft: horizontalInsetPx,
    },
    middleRight: {
        marginRight: horizontalInsetPx,
    },

    iconFont: {
        fontFamily: 'Proxima Nova Semibold',
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
