/**
 * A component that renders a single SVG icon.
 */

const React = require('react');
const ReactDOM = require('react-dom');

const Iconography = require('./iconography');

const SvgIcon = React.createClass({
    propTypes: {
        color: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
    },

    _addFillRule() {
        // TODO(kevinb) remove this when we upgrade to React 15.
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof SVGElement) {
            const firstGroup = node.querySelector('g');
            firstGroup.setAttributeNS(null, 'fill-rule', 'evenodd');
        }
    },

    componentDidMount() {
        this._addFillRule();
    },

    componentDidUpdate(prevProps) {
        if (prevProps.name !== this.props.name) {
            this._addFillRule();
        }
    },

    render() {
        const {color, name} = this.props;

        const SvgForName = Iconography[name];
        return <SvgForName color={color} />;
    },
});

module.exports = SvgIcon;
