const React = require('react');
const {StyleSheet} = require("aphrodite");

const {View} = require('../fake-react-native-web');
const {components, consts} = require('../index');

const { Keypad, KeypadInput } = components;

const TAG = 'ReactNativeJS';

class App extends React.Component {
    state = {
        keypadElement: null,
        value: "",
        key: "",
        keypadType: consts.KeypadTypes.EXPRESSION,
        displayKeypadSelector: false,
        scrollable: true,
        scalesToFit: false
    };

    keypadInputElement = null;

    componentDidMount() {
        this.messageEventDisposer = this.addMessageListener();
        this.resizeEventDisposer = this.addResizeListener();
    }

    componentDidUpdate(prevProps, prevState) {
        this.state.value !== prevState.value && this.postMessage({ latex: this.state.value, key: this.state.key });
    }

    componentWillUnmount() {
        this.messageEventDisposer();
        this.resizeEventDisposer();
    }

    addMessageListener() {
        const listener = (e) => {
            let { latex, keypadType, scrollable, scalesToFit, origin } = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
            if (!origin || origin !== TAG) return;
            const stateReducer = {};
            if (latex && latex !== this.state.value) {
                Object.assign(stateReducer, { value: latex, key: '' });
            }
            if (typeof scrollable === 'boolean' && scrollable !== this.state.scrollable) {
                Object.assign(stateReducer, { scrollable });
            }
            if (typeof scalesToFit === 'boolean' && scalesToFit !== this.state.scalesToFit) {
                Object.assign(stateReducer, { scalesToFit });
            }
            if ((keypadType === consts.KeypadTypes.EXPRESSION || keypadType === consts.KeypadTypes.FRACTION) && keypadType !== this.state.keypadType) {
                this.configureKeypad(keypadType);
                Object.assign(stateReducer, { keypadType });
            }

            return Object.keys(stateReducer).length > 0 && this.setState(stateReducer);
        };

        window.addEventListener('message', listener);
        return () => window.removeEventListener("message", listener);
    }

    addResizeListener() {
        const listener = () => this.postMessage();
        window.addEventListener('resize', listener);
        return () => window.removeEventListener("message", listener);
    }

    postMessage(data = {}) {
        const keypadLayout = this.state.keypadElement.getDOMNode().getBoundingClientRect().toJSON();
        const keypadInputLayout = this.keypadInputElement ? {
            ...this.keypadInputElement.getDOMNode().getBoundingClientRect().toJSON(),
            overflow: this.keypadInputElement.getOverflow()
        } : {};
        const message = JSON.stringify({ ...data, keypadLayout, keypadInputLayout });

        
        /**
         * see https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#onmessage
         * */
        window.ReactNativeWebView && window.ReactNativeWebView.postMessage(message);
        //window.postMessage(message);
    }

    handleChange = (e: SyntheticEvent<>) => {
        this.configureKeypad(e.target.value);
        this.setState({ keypadType });
    };

    configureKeypad(keypadType) {
        this.state.keypadElement.configure({
            keypadType,
            extraKeys: ["x", "y", "PI", "THETA"],
        });
    }

    render() {
        return <View>
            <View style={styles.container}>
                <KeypadInput
                    value={this.state.value}
                    keypadElement={this.state.keypadElement}
                    onChange={(value, cb, key) => this.setState({ value, key }, cb)}
                    onFocus={() => this.state.keypadElement.activate()}
                    onBlur={() => this.state.keypadElement.dismiss()}
                    ref={(node) => this.keypadInputElement = node}
                    scrollable={this.state.scrollable}
                    scalesToFit={this.state.scalesToFit}
                />
                <View style={[styles.selectContainer, !this.state.displayKeypadSelector && styles.hide]}>
                    Keypad type: 
                    <select 
                        onChange={this.handleChange}
                        value={this.state.keypadType}
                    >
                        <option value={consts.KeypadTypes.FRACTION}>
                            FRACTION
                        </option>
                        <option value={consts.KeypadTypes.EXPRESSION}>
                            EXPRESSION
                        </option>
                    </select>
                </View>
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
        flexDirection: "row"
    },
    hide: {
        display: "none"
    }
});

module.exports = App;
