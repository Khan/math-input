/**
 * A component that renders an icon for a symbol with the given name.
 */

const React = require('react');
const ReactDOM = require('react-dom');

const Iconography = require('./iconography');
const UnicodeIcon = require('./unicode-icon');
const { unicodeSymbolPropType } = require('./prop-types');

const Icon = React.createClass({
    propTypes: {
        focused: React.PropTypes.bool,
        name: React.PropTypes.string.isRequired,
        unicodeSymbol: unicodeSymbolPropType,
    },

    // TODO(kevinb) remove this when we upgrade to React 15
    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof SVGElement) {
            const firstGroup = node.querySelector('g');
            firstGroup.setAttributeNS(null, 'fill-rule', 'evenodd');
        }
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
            return <UnicodeIcon
                unicodeSymbol={unicodeSymbol}
                focused={focused}
            />;
        } else {
            throw new Error(
                "No icon or symbol provided for key with name:", name);
        }
    },
});

module.exports = Icon;
