/**
 * React PropTypes that may be shared between components.
 */

const React = require('react');

const KeyConfigs = require('../data/key-configs');
const CursorContexts = require('./input/cursor-contexts');
const { BorderDirections, KeyTypes, KeypadTypes } = require('../consts');

const keyIdPropType = React.PropTypes.oneOf(Object.keys(KeyConfigs));

const keyConfigPropType = React.PropTypes.shape({
    ariaLabel: React.PropTypes.string,
    id: keyIdPropType.isRequired,
    type: React.PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
    childKeyIds: React.PropTypes.arrayOf(keyIdPropType),
    unicodeSymbol: React.PropTypes.string,
});

const keypadConfigurationPropType = React.PropTypes.shape({
    keypadType: React.PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
    extraKeys: React.PropTypes.arrayOf(keyIdPropType),
});

// TODO(charlie): This should be `React.PropTypes.element`, but I keep getting
// errors. It may be related to the fact that the keypad is rendered in a
// different component tree (w/r/t Perseus)?
const keypadElementPropType = React.PropTypes.object;

const bordersPropType =  React.PropTypes.arrayOf(
    React.PropTypes.oneOf(Object.keys(BorderDirections))
);

const boundingBoxPropType = React.PropTypes.shape({
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    top: React.PropTypes.number,
    right: React.PropTypes.number,
    bottom: React.PropTypes.number,
    left: React.PropTypes.number,
});

const echoPropType = React.PropTypes.shape({
    animationId: React.PropTypes.string.isRequired,
    borders: bordersPropType,
    id: keyIdPropType.isRequired,
    initialBounds: boundingBoxPropType.isRequired,
});

const cursorContextPropType = React.PropTypes.oneOf(
    Object.keys(CursorContexts)
);

const popoverPropType = React.PropTypes.shape({
    bounds: boundingBoxPropType.isRequired,
    childKeyIds: React.PropTypes.arrayOf(keyIdPropType).isRequired,
});

const childrenPropType = React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
]);

module.exports = {
    keyConfigPropType,
    keyIdPropType,
    keypadConfigurationPropType,
    keypadElementPropType,
    bordersPropType,
    boundingBoxPropType,
    echoPropType,
    cursorContextPropType,
    popoverPropType,
    childrenPropType,
};
