/**
 * A component that renders a single SVG icon.
 */

const React = require('react');

const Iconography = require('./iconography');

class SvgIcon extends React.Component {
    static propTypes = {
        color: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
    };

    render() {
        const {color, name} = this.props;

        const SvgForName = Iconography[name];
        return <SvgForName color={color} />;
    }
}

module.exports = SvgIcon;
