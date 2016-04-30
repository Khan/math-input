/**
 * A touchable wrapper around the base KeypadButton component. This button is
 * responsible for keeping our button ID system (which will be used to handle
 * touch events globally) opaque to the KeypadButton.
 */

const React = require('react');
const { connect } = require('react-redux');

const actions = require('../actions');
const KeypadButton = require('./keypad-button');
const KeyConfigs = require('../data/key-configs');
const { keyIdPropType } = require('./prop-types');

const TouchableKeypadButton = React.createClass({
    propTypes: {
        id: keyIdPropType.isRequired,
    },

    render() {
        /* eslint-disable no-unused-vars */
        const { id, ...rest } = this.props;

        // TODO(charlie): Use the ID to register the DOM node and other touch
        // events.
        return <KeypadButton {...rest} />;
    },
});

const mapStateToProps = (state, ownProps) => {
    const { gestures } = state;

    const { keyConfig, ...rest } = ownProps;
    const { id, childKeyIds, type } = keyConfig;

    return {
        ...rest,
        id: id,

        // Sanitze various props for the KeypadButton.
        childKeys: childKeyIds && childKeyIds.map(id => KeyConfigs[id]),
        focused: gestures.focus === id,
        name: id,
        onClick: () => actions.pressKey(id),
        popoverEnabled: gestures.popover === id,
        type: type,
    };
};

module.exports = connect(mapStateToProps)(TouchableKeypadButton);
