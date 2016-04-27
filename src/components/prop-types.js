/**
 * React PropTypes that may be shared between components.
 */

const React = require('react');

const { keyTypes } = require('../consts');

const keyPropType = React.PropTypes.shape({
    name: React.PropTypes.string,
    onClick: React.PropTypes.func,
    type: React.PropTypes.oneOf(Object.keys(keyTypes)),
});

module.exports = {
    keyPropType,
};
