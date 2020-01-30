const React = require('react');
const {StyleSheet} = require("aphrodite");

const {View} = require('../fake-react-native-web');
const {components, consts} = require('../index');

const {Keypad, KeypadInput} = components;

class App extends React.Component {
    state = {
        keypadElement: null,
        value: "",
        keypadType: consts.KeypadTypes.EXPRESSION,
    };

    componentDidMount = () => {
        window.setMathInputValue = this.setValue;
    }

    setValue = (value, callback) => {
        window.mathInputValue = value;
        if (callback) {
            this.setState({value}, callback);
        } else {
            this.setState({value});
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.keypadElement !== this.state.keypadElement) {
            this.configureKeypad();
        }
    }

    configureKeypad = () => {
        this.state.keypadElement.configure({
            keypadType: this.state.keypadType,
            extraKeys: ["x", "y", "PI", "THETA"],
        });
    };

    render() {
        return <View>
            <View style={styles.container}>
                <KeypadInput
                    value={this.state.value}
                    keypadElement={this.state.keypadElement}
                    onChange={(value, callback) => {
                        this.setValue(value, callback);
                    }}
                    onFocus={() => this.state.keypadElement.activate()}
                    onBlur={() => this.state.keypadElement.dismiss()}
                />
            </View>
            <Keypad
                onElementMounted={node => {
                    if (node && !this.state.keypadElement) {
                        this.setState({keypadElement: node});
                    }
                }}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
    },
    selectContainer: {
        marginTop: 16,
        flexDirection: "row",
    },
});

module.exports = App;
