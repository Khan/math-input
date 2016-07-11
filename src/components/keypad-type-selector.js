/**
 * A component used to toggle between a set of available keypad types.
 */

const React = require('react');

const {KeypadTypes} = require('../consts');

const KeypadTypeSelector = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
    },

    _buttonForType(keypadType) {
        return <button
            key={keypadType}
            onClick={() => this.props.onChange(keypadType)}
        >
            {keypadType}
        </button>;
    },

    render() {
        return <div>{Object.keys(KeypadTypes).map(this._buttonForType)}</div>;
    },
});

module.exports = KeypadTypeSelector;
