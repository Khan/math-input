const React = require('react');
const { Provider } = require('react-redux');

const { View } = require('../fake-react-native-web');
const MathInput = require('./input/math-input');
const MathKeypad = require('./math-keypad');
const KeypadTypeSelector = require('./keypad-type-selector');
const store = require('../store');
const {
    activateKeypad, configureKeypad, dismissKeypad, setCursor,
} = require('../actions');
const Keypads = require('../data/keypads');
const { DebugSwitcherTypes } = require('../consts');
const Settings = require('../settings');

const App = React.createClass({
    getInitialState() {
        return {
            keypadElement: null,
            value: "",
        };
    },

    render() {
        return <View>
            <div
                style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 40,
                }}
            >
                <MathInput
                    value={this.state.value}
                    keypadElement={this.state.keypadElement}
                    onChange={(value, cb) => this.setState({ value }, cb)}
                    onCursorMove={setCursor}
                    onBlur={dismissKeypad}
                    onFocus={activateKeypad}
                />
            </div>
            <Provider store={store}>
                <MathKeypad onElementMounted={node => {
                    if (node && node !== this.state.keypadElement) {
                        this.setState({ keypadElement: node});
                    }
                }}/>
            </Provider>
            {Settings.debugSwitcher === DebugSwitcherTypes.ENABLED &&
                <KeypadTypeSelector onChange={keypadType => {
                    configureKeypad({
                        keypadType,
                        // NOTE(charlie): In the playground, we hardcode the
                        // list of symbols for each keypad.
                        extraKeys: Keypads[keypadType].extraKeys,
                    });
                }}
                />}
        </View>;
    },
});

module.exports = App;
