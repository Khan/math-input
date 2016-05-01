/**
 * A popover that renders a set of keys floating above the page.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const { keyConfigPropType } = require('./prop-types');

const MultiSymbolPopover = React.createClass({
    propTypes: {
        keys: React.PropTypes.arrayOf(keyConfigPropType),
    },

    render() {
        const { keys } = this.props;

        // TODO(charlie): We have to require this lazily because of a cyclic
        // dependence in our components.
        const TouchableKeypadButton = require('./touchable-keypad-button');
        return <View style={styles.container}>
            {keys.map(key => <TouchableKeypadButton keyConfig={key} />)}
        </View>;
    },
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column-reverse',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        zIndex: 1,
        boxShadow: '3px 3px 5px 6px #ccc',
        cursor: 'pointer',
    },
});

module.exports = MultiSymbolPopover;
