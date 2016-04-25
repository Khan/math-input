/**
 * A keypad button that displays an arbitrary number of symbols, with no
 * 'default' symbol.
 */

const React = require('react');

const KeypadButton = require('./keypad-button');
const EmptyKeypadButton = require('./empty-keypad-button');
const SimpleKeypadButton = require('./simple-keypad-button');
const { keyPropType } = require('./prop-types');

const ManyKeypadButton = React.createClass({
    propTypes: {
        keys: React.PropTypes.arrayOf(keyPropType).isRequired,
    },

    render() {
        const { keys } = this.props;

        // If we have no extra symbols, render an empty button. If we have just
        // one, render a standard button. Otherwise, capture them all in a
        // single button with no 'default' symbol.
        if (keys.length === 0) {
            return <EmptyKeypadButton />;
        } else if (keys.length === 1) {
            return <SimpleKeypadButton singleKey={keys[0]} />;
        } else {
            return <KeypadButton
                primaryKey={null}
                secondaryKeys={keys}
            />;
        }
    },
});

module.exports = ManyKeypadButton;
