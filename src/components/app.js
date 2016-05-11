const React = require('react');
const { Provider } = require('react-redux');

const { View } = require('../fake-react-native-web');

const MathInput = require('./input/math-input');
const MathKeypad = require('./math-keypad');
const KeypadTypeSelector = require('./keypad-type-selector');

const store = require('../store');
const {
    activateKeypad, configureKeypad, dismissKeypad, setCursor
} = require('../actions');
const { debugSwitcherTypes } = require('../consts');
const Settings = require('../settings');

const App = React.createClass({
    render() {
        return <View>
            <MathInput
                onCursorMove={setCursor}
                onBlur={dismissKeypad}
                onFocus={activateKeypad}
            />
            <Provider store={store}>
                <MathKeypad />
            </Provider>
            {Settings.debugSwitcher === debugSwitcherTypes.ENABLED &&
                <KeypadTypeSelector onChange={keypadType =>
                    configureKeypad({ keypadType })}
                />}
        </View>;
    },
});

module.exports = App;
