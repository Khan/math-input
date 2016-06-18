/**
 * A popover that renders a set of keys floating above the page.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const { keyConfigPropType } = require('./prop-types');
const { KeyTypes, BorderStyles } = require('../consts');
const zIndexes = require('./z-indexes');

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
            {keys.map(key => {
                // NOTE(charlie): Right now, buttons that appear in the
                // popover are styled identically to the numeral buttons, i.e.,
                // in a very simple way (white background, no borders). If the
                // numeral buttons change in style, we'll have to change this
                // logic to mimic a different button type.
                const keyConfig = {
                    ...key,
                    type: KeyTypes.NUMERAL,
                };
                return <TouchableKeypadButton
                    key={keyConfig.id}
                    keyConfig={keyConfig}
                    borders={BorderStyles.NONE}
                />;
            })}
        </View>;
    },
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column-reverse',
        position: 'relative',
        width: '100%',
        borderRadius: 2,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        zIndex: zIndexes.popover,
    },

    popoverButton: {
        backgroundColor: '#FFF',
        borderWidth: 0,
    },
});

module.exports = MultiSymbolPopover;
