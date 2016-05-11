/**
 * A component that renders an icon for a symbol with the given name.
 */

const React = require('react');

const Iconography = require('./iconography');
const MultiSymbolGrid = require('./multi-symbol-grid');

const Icon = React.createClass({
    propTypes: {
        focused: React.PropTypes.bool,
        name: React.PropTypes.string.isRequired,
        unicodeSymbol: React.PropTypes.string,
    },

    render() {
        const { focused, name, unicodeSymbol } = this.props;

        // Select the appropriate icon, if it's available. Otherwise, render a
        // text-based icon using the fallback unicode symbol.
        if (Iconography[name]) {
            // TODO(charlie): Some of the generated SVGs contain redundant
            // information. We should spend some time optimizing them to
            // decrease payload size.
            const Component = Iconography[name];
            const componentProps = focused ? { primaryColor: '#FFF' } : {};
            return <Component {...componentProps} />;
        } else if (unicodeSymbol) {
            return <MultiSymbolGrid
                unicodeSymbols={[unicodeSymbol]}
                focused={focused}
            />;
        } else {
            throw new Error(
                "No icon or symbol provided for key with name:", name);
        }
    },
});

module.exports = Icon;
