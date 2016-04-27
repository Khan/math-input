/**
 * A popover that renders a set of keys floating above the page.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');
const { View } = require('../fake-react-native-web');

const Icon = require('./icon');
const { buttonFontSizePrimary } = require('./common-style');
const { keyPropType } = require('./prop-types');

const MultiSymbolPopover = React.createClass({
    propTypes: {
        keys: React.PropTypes.arrayOf(keyPropType),
    },

    render() {
        // TODO(charlie): This needs to receive the proper button height.
        return <View style={styles.container}>
            <View style={styles.column}>
                {this.props.keys.map(key => {
                    return <View onClick={key.onClick}>
                        <Icon name={key.name} />
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

    text: {
        fontFamily: 'sans-serif',
        fontSize: buttonFontSizePrimary,
        // Make the text unselectable
        userSelect: 'none',
    },
});

module.exports = MultiSymbolPopover;
