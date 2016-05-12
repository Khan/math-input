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
const { debugSwitcherTypes } = require('../consts');
const Settings = require('../settings');

const App = React.createClass({
    getInitialState() {
        return {
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
                    onChange={value => this.setState({ value })}
                    onCursorMove={setCursor}
                    onBlur={dismissKeypad}
                    onFocus={activateKeypad}
                />
            </div>
            <Provider store={store}>
                <MathKeypad />
            </Provider>
            {Settings.debugSwitcher === debugSwitcherTypes.ENABLED &&
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
