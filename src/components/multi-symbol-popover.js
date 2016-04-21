/**
 * A popover that renders a set of keys floating above the page.
 */

const React = require('react');

const { StyleSheet } = require('aphrodite');
const { View, Text } = require('../fake-react-native-web');
const { buttonHeightPx, buttonFontSizePrimary } = require('./common-style');

const MultiSymbolPopover = React.createClass({
    propTypes: {
        keys: React.PropTypes.arrayOf(React.PropTypes.shape({
            onClick: React.PropTypes.func,
            label: React.PropTypes.string,
        })),
    },

    render() {
        return <View style={styles.container}>
            <View style={styles.column}>
                {this.props.keys.map(key => {
                    return <View style={styles.cell} onClick={key.onClick}>
                        <Text style={styles.text}>
                            {key.label}
                        </Text>
                    </View>;
                })}
            </View>
        </View>;
    },
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        height: buttonHeightPx,
    },

    column: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#FFF',
        zIndex: 1,
        boxShadow: '3px 3px 5px 6px #ccc',
        cursor: 'pointer',
    },

    cell: {
        height: buttonHeightPx,
        lineHeight: `${buttonHeightPx}px`,
    },

    text: {
        fontFamily: 'sans-serif',
        fontSize: buttonFontSizePrimary,
        // Make the text unselectable
        userSelect: 'none',
    },
});

module.exports = MultiSymbolPopover;
