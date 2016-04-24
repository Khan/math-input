/**
 * React PropTypes that may be shared between components.
 */

const React = require('react');

const keyPropType = React.PropTypes.shape({
    onClick: React.PropTypes.func,
    label: React.PropTypes.string,
});

module.exports = {
    keyPropType,
};
