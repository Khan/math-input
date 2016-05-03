/**
 * A component that renders an icon for a symbol with the given name.
 */

const React = require('react');

const Iconography = require('./iconography');
const { View } = require('../fake-react-native-web');

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
        // TODO(charlie): Some of the generated SVGs aren't quite rendering
        // correctly (for example, the EXP symbol isn't positioning its
        // superscript box on the correct side). Once we have the final
        // iconography, work with design to identify the troublesome SVG
        // patterns and modify the icons appropriately.
        const Component = Iconography[name] || View;
        const componentProps = focused ? { primaryColor: '#FFF' } : {};
        return <Component {...componentProps} />;
    },
});

module.exports = Icon;
