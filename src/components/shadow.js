/**
 * An opaque shadow that can be rendered on top of a view to darken it.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');

const Shadow = () => {
    return <View style={styles.shadow} />;
};

const styles = StyleSheet.create({
    shadow: {
        backgroundColor: 'rgba(32, 36, 44, 0.15)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
});

module.exports = Shadow;
