const React = require('react');
const { StyleSheet } = require('aphrodite');
const { Text, View } = require('./react-native');


const KeypadButton = (props) => {
    return <View
        style={styles.button}
        onClick={props.onClick}
    >
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
        width: 100,
        height: 100,
        border: 'solid 1px gray',
        lineHeight: '100px',
        textAlign: 'center',
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 48,
    }
});

module.exports = KeypadButton;
