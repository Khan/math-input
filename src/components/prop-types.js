/**
 * React PropTypes that may be shared between components.
 */

const React = require('react');

const { keyTypes } = require('../consts');

const keyPropType = React.PropTypes.shape({
    onClick: React.PropTypes.func,
    label: React.PropTypes.string,
    type: React.PropTypes.oneOf(Object.keys(keyTypes)),
});

module.exports = {
    keyPropType,
};
