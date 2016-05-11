/**
 * React PropTypes that may be shared between components.
 */

const React = require('react');

const KeyConfigs = require('../data/key-configs');
const CursorContexts = require('./input/cursor-contexts');
const { borderDirections, keyTypes } = require('../consts');

const keyIdPropType = React.PropTypes.oneOf(Object.keys(KeyConfigs));

const keyConfigPropType = React.PropTypes.shape({
    id: keyIdPropType.isRequired,
    type: React.PropTypes.oneOf(Object.keys(keyTypes)).isRequired,
    childKeyIds: React.PropTypes.arrayOf(keyIdPropType),
    unicodeSymbol: React.PropTypes.string,
});

const bordersPropType =  React.PropTypes.arrayOf(
    React.PropTypes.oneOf(Object.keys(borderDirections))
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

const childrenPropType = React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
]);

module.exports = {
    keyConfigPropType,
    keyIdPropType,
    bordersPropType,
    boundingBoxPropType,
    echoPropType,
    cursorContextPropType,
    childrenPropType,
};
