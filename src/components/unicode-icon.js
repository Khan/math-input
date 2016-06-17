/**
 * An icon, rendered with a single character of text.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const UnicodeSymbol = require('./unicode-symbol');
const { row, centered } = require('./styles');
const {
    gray25, iconSizeHeightPx, iconSizeWidthPx,
} = require('./common-style');

const UnicodeIcon = React.createClass({
    propTypes: {
        focused: React.PropTypes.bool,
        unicodeSymbol: React.PropTypes.shape({
            character: React.PropTypes.string.isRequired,
            italicized: React.PropTypes.boolean,
        }).isRequired,
    },

    render() {
        const { focused, unicodeSymbol } = this.props;

        const containerStyle = [row, centered, styles.iconSize];
        const iconStyle = [
            styles.iconFont,
            styles.iconColor,
            unicodeSymbol.italicized && styles.italicized,
            focused && styles.focused,
        ];
        return <View style={containerStyle}>
            <UnicodeSymbol style={iconStyle} unicodeSymbol={unicodeSymbol} />
        </View>;
    },
});

const styles = StyleSheet.create({
    iconSize: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx,
    },

    iconFont: {
        fontFamily: 'Proxima Nova',
        fontSize: 25,
    },
    italicized: {
        fontStyle: 'italic',
    },
    iconColor: {
        color: gray25,
    },
    focused: {
        color: '#FFF',
    },
});

module.exports = UnicodeIcon;
