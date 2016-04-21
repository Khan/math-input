const React = require('react');

const { StyleSheet } = require('aphrodite');
const { Text, View } = require('../fake-react-native-web');

const KeypadButton = (props) => {
    const style = [
        styles.button,
        // React Native allows you to set the 'style' props on user defined
        // components, https://facebook.github.io/react-native/docs/style.html
        ...(Array.isArray(props.style) ? props.style : [props.style]),
    ];

    return <View style={style} onClick={props.onClick}>
        <Text style={styles.text}>
            {props.label}
        </Text>
    </View>;
};

KeypadButton.propTypes = {
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    style: React.PropTypes.any, // TODO(kevinb) switch to react-native-web
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 44,
        borderColor: '#BBB',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: -1,
        marginRight: -1,
        lineHeight: '44px',
        textAlign: 'center',
        backgroundColor: '#EEE',
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 24,
    },
});

module.exports = KeypadButton;
