/**
 * A component that renders an icon for a symbol with the given name.
 */

const React = require('react');

const { Image, View } = require('../fake-react-native-web');

const Icon = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
    },

    _urlForName(name) {
        return `/images/icons/${name}.svg`;
    },

    render() {
        const { name } = this.props;

        // TODO(charlie): Right now, we're consuming SVGs that have been
        // exported from Sketch. We should put these SVGs through a minifier
        // before shipping to production. We may also want to explore the use
        // of inline SVG, rather than loading the SVGs in <img> tags.
        return <View>
            <Image
                source={this._urlForName(name)}
                resizeMode={'contain'}
            />
        </View>;
    },
});

module.exports = Icon;
