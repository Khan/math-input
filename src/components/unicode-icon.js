/**
 * An icon, rendered with a single character of text.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { Text, View } = require('../fake-react-native-web');
const { row, centered } = require('./styles');
const {
    iconGrey, iconSizeHeightPx, iconSizeWidthPx,
} = require('./common-style');

const UnicodeIcon = React.createClass({
    propTypes: {
        focused: React.PropTypes.bool,
        unicodeSymbol: React.PropTypes.string.isRequired,
    },

    render() {
        const { focused, unicodeSymbol } = this.props;

        const containerStyle = [row, centered, styles.iconSize];
        const iconStyle = [
            styles.iconFont,
            styles.iconColor,
            focused && styles.focused,
        ];
        return <View style={containerStyle}>
            <Text style={iconStyle}>
                {unicodeSymbol}
            </Text>
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
        fontStyle: 'italic',
        fontSize: 25,
    },
    iconColor: {
        color: iconGrey,
    },
    focused: {
        color: '#FFF',
    },
});

module.exports = UnicodeIcon;
