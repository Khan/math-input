/**
 * A simple component that renders a single unicode character, which can
 * optionally be italicized.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { Text } = require('../fake-react-native-web');
const { fullWidth, centeredText } = require('./styles');
const { unicodeSymbolPropType } = require('./prop-types');

const UnicodeSymbol = React.createClass({
    propTypes: {
        style: React.PropTypes.any,
        unicodeSymbol: unicodeSymbolPropType.isRequired,
    },

    render() {
        const { style, unicodeSymbol } = this.props;
        const { character, italicized } = unicodeSymbol;

        const symbolStyle = [
            italicized && styles.italicized,
            centeredText,
            fullWidth,
            ...(Array.isArray(style) ? style : [style]),
        ];

        return <Text style={symbolStyle}>
            {character}
        </Text>;
    },
});

const styles = StyleSheet.create({
    italicized: {
        fontStyle: 'italic',
    },
});

module.exports = UnicodeSymbol;
