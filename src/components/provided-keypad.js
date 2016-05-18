const React = require('react');
const { Provider } = require('react-redux');

const MathKeypad = require('./math-keypad');
const store = require('../store');

module.exports = React.createClass({
    render() {
        return <Provider store={store}>
            <MathKeypad {...this.props} />
        </Provider>;
    },
});
