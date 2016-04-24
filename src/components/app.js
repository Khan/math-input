const React = require('react');
const { Provider } = require('react-redux');

const { View } = require('../fake-react-native-web');

const MathInput = require('./math-input');
const MathKeypad = require('./math-keypad');
const KeypadTypeSelector = require('./keypad-type-selector');

const store = require('../store');
const { configureKeypad } = require('../actions');

const App = React.createClass({
    render() {
        return <View>
            <MathInput />
            <Provider store={store}>
                <MathKeypad />
            </Provider>
            <KeypadTypeSelector onChange={keypadType =>
                configureKeypad({ keypadType })}
            />
        </View>;
    },
});

module.exports = App;
