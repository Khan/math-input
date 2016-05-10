const React = require('react');
const { Provider } = require('react-redux');

const MathKeypad = require('./math-keypad');
const store = require('../store');

module.exports = (props) =>
    <Provider store={store}>
        <MathKeypad {...props} />
    </Provider>;
