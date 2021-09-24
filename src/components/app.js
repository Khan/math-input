const React = require("react");
const {StyleSheet} = require("aphrodite");

const {View} = require("../fake-react-native-web");
// const {components, consts} = require("../index");
const {components, consts} = require("../vt");

const {Keypad, KeypadInput} = components;

class App extends React.Component {
    state = {
        keypadElement: null,
        value: "",
        keypadType: consts.KeypadTypes.CUSTOM_VT_MATH,
    };

    handleChange = (e) => {
        this.state.keypadElement.configure({
            keypadType: e.target.value,
            extraKeys: ["x", "y", "PI", "THETA"],
        });
        this.setState({keypadType: e.target.value});
    };

    render() {
        return (
            <View>
                DEMO TEST
                <KeypadInput
                    value={this.state.value}
                    keypadElement={this.state.keypadElement}
                    onChange={(value, cb) => this.setState({value}, cb)}
                    onFocus={() => this.state.keypadElement.activate()}
                    onBlur={() => this.state.keypadElement.dismiss()}
                />
                <Keypad
                    onElementMounted={(node) => {
                        if (node && !this.state.keypadElement) {
                            this.setState({
                                keypadElement: node,
                                keypadType: consts.KeypadTypes.CUSTOM_VT_MATH,
                            });
                        }
                    }}
                />
            </View>
        );
    }
}

module.exports = App;
