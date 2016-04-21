const React = require('react');
const { Provider } = require('react-redux');

const { View } = require('../fake-react-native-web');

const MathInput = require('./math-input');
const MathKeypad = require('./math-keypad');
const store = require('../store');

const App = React.createClass({
    render() {
        return <View>
            <MathInput currentValue="foo" />
            <Provider store={store}>
                <MathKeypad />
            </Provider>
        </View>;
    },
});

module.exports = App;
