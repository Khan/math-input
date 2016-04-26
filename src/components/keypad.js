/**
 * A simple keypad that merely acts as a container for rows or columns of
 * buttons.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const { keypad } = require('./styles');

const Keypad = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node,
        ]),
    },

    render() {
        return <View style={keypad}>
            {this.props.children}
        </View>;
    },
});

module.exports = Keypad;
