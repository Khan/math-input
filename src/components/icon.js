/**
 * A component that renders an icon for a symbol with the given name.
 */

const React = require('react');

const Iconography = require('./iconography');

const Icon = React.createClass({
    propTypes: {
        focused: React.PropTypes.bool,
        name: React.PropTypes.string.isRequired,
    },

    render() {
        const { focused, name } = this.props;

        // Select the appropriate icon, if it's available. Otherwise, render a
        // blank <View>.
        // TODO(charlie): Some of the generated SVGs contain redundant
        // information. We should spend some time optimizing them to decrease
        // payload size.
        const Component = Iconography[name];
        const componentProps = focused ? { primaryColor: '#FFF' } : {};
        return <Component {...componentProps} />;
    },
});

module.exports = Icon;
