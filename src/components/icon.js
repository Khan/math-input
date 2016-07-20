/**
 * A component that renders an icon for a symbol with the given name.
 */

const React = require('react');
const ReactDOM = require('react-dom');

const Iconography = require('./iconography');
const UnicodeIcon = require('./unicode-icon');
const {unicodeSymbolPropType} = require('./prop-types');
const {gray25} = require('./common-style');

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
        const {focused, name, unicodeSymbol} = this.props;

        // Select the appropriate icon, if it's available. Otherwise, render a
        // text-based icon using the fallback unicode symbol.
        if (Iconography[name]) {
            const Component = Iconography[name];
            const componentProps = {color: focused ? '#FFF' : gray25};
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
