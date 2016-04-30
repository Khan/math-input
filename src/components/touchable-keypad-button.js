/**
 * A touchable wrapper around the base KeypadButton component. This button is
 * responsible for keeping our button ID system (which will be used to handle
 * touch events globally) opaque to the KeypadButton.
 */

const React = require('react');

const KeypadButton = require('./keypad-button');
const KeyConfigs = require('../data/key-configs');
const { keyConfigPropType } = require('./prop-types');

const TouchableKeypadButton = React.createClass({
    propTypes: {
        keyConfig: keyConfigPropType.isRequired,
    },

    render() {
        const { keyConfig, ...rest } = this.props;
        const { id, childKeyIds, type } = keyConfig;

        return <KeypadButton
            name={id}
            type={type}
            childKeys={childKeyIds &&
                childKeyIds.map(id => KeyConfigs[id])}
            {...rest}
        />;
    },
});

module.exports = TouchableKeypadButton;
