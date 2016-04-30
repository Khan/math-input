/**
 * React PropTypes that may be shared between components.
 */

const React = require('react');

const KeyConfigs = require('../data/key-configs');
const { keyTypes } = require('../consts');

const keyIdPropType = React.PropTypes.oneOf(Object.keys(KeyConfigs));

const keyConfigPropType = React.PropTypes.shape({
    id: keyIdPropType.isRequired,
    type: React.PropTypes.oneOf(Object.keys(keyTypes)).isRequired,
    childKeyIds: React.PropTypes.arrayOf(keyIdPropType),
});

module.exports = {
    keyConfigPropType,
    keyIdPropType,
};
