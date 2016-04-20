const React = require('react');
const { StyleSheet } = require('aphrodite');
const { Text, View } = require('./react-native');


const KeypadButton = (props) => {
    const style = [
        styles.button,
        // React Native allows you to set the 'style' props on user defined
        // components, https://facebook.github.io/react-native/docs/style.html
        ...(Array.isArray(props.style) ? props.style : [props.style])
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
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 60,
        borderColor: '#BBB',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderRightWidth: 1,
        lineHeight: '60px',
        textAlign: 'center',
        backgroundColor: '#EEE',
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 32,
    }
});

module.exports = KeypadButton;
