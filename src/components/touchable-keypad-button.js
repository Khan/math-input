/**
 * A touchable wrapper around the base KeypadButton component. This button is
 * responsible for keeping our button ID system (which will be used to handle
 * touch events globally) opaque to the KeypadButton.
 */

const React = require('react');
const ReactDOM = require('react-dom');
const { connect } = require('react-redux');

const KeypadButton = require('./keypad-button');
const KeyConfigs = require('../data/key-configs');
const GestureManager = require('./gesture-manager');
const { bordersPropType, keyIdPropType } = require('./prop-types');
const { KeyTypes } = require('../consts');

const TouchableKeypadButton = React.createClass({
    propTypes: {
        borders: bordersPropType,
        childKeyIds: React.PropTypes.arrayOf(keyIdPropType),
        focused: React.PropTypes.bool,
        gestureManager: React.PropTypes.instanceOf(GestureManager),
        id: keyIdPropType.isRequired,
        popoverEnabled: React.PropTypes.bool,
        type: React.PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
    },

    shouldComponentUpdate(newProps) {
        // We take advantage of a few different properties of our key
        // configuration system. Namely, we know that the other props flow
        // directly from the ID, and thus don't need to be checked.
        return newProps.id !== this.props.id ||
            newProps.gestureManager !== this.props.gestureManager ||
            newProps.focused !== this.props.focused ||
            newProps.popoverEnabled !== this.props.popoverEnabled ||
            newProps.type !== this.props.type;
    },

    componentWillUnmount() {
        const { gestureManager, id } = this.props;
        gestureManager.unregisterDOMNode(id);
    },

    render() {
        const {
            borders, childKeyIds, gestureManager, id, ...rest,
        } = this.props;

        return <KeypadButton
            ref={(node) => gestureManager.registerDOMNode(
                id, ReactDOM.findDOMNode(node), childKeyIds, borders
            )}
            onTouchStart={(evt) => gestureManager.onTouchStart(evt, id)}
            onTouchEnd={(evt) => gestureManager.onTouchEnd(evt)}
            onTouchMove={(evt) => gestureManager.onTouchMove(evt)}
            onTouchCancel={(evt) => gestureManager.onTouchCancel(evt)}
            borders={borders}
            {...rest}
        />;
    },
});

const mapStateToProps = (state, ownProps) => {
    const { gestures } = state;

    const { keyConfig, ...rest } = ownProps;
    const { id, childKeyIds, type, unicodeSymbol } = keyConfig;

    return {
        ...rest,
        childKeyIds: childKeyIds,
        gestureManager: gestures.gestureManager,
        id: id,

        // Sanitze various props for the KeypadButton.
        childKeys: childKeyIds && childKeyIds.map(id => KeyConfigs[id]),
        focused: gestures.focus === id,
        name: id,
        popoverEnabled: gestures.popover === id,
        type: type,
        unicodeSymbol: unicodeSymbol,
    };
};

module.exports = connect(mapStateToProps)(TouchableKeypadButton);
