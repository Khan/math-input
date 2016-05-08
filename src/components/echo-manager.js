/**
 * A component that renders and animates the selection state effect effect.
 */

const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const { removeEcho } = require('../actions');
const KeypadButton = require('./keypad-button');
const { keyTypes } = require('../consts');
const {
    echoPropType, bordersPropType, boundingBoxPropType, keyIdPropType,
} = require('./prop-types');

// NOTE(charlie): This must be kept in sync with the transition duration
// specified in echo.css.
const echoAnimationMs = 1000;

const Echo = React.createClass({
    propTypes: {
        animationId: React.PropTypes.string.isRequired,
        borders: bordersPropType,
        id: keyIdPropType.isRequired,
        initialBounds: boundingBoxPropType.isRequired,
    },

    componentDidMount() {
        // NOTE(charlie): This is somewhat unfortunate, as the component is
        // encoding information about its own animation, of which it should be
        // ignorant. However, there doesn't seem to be a cleaner way to make
        // this happen, and at least here, all the animation context is
        // colocated in this file.
        const { animationId } = this.props;
        setTimeout(() => removeEcho(animationId), echoAnimationMs);
    },

    render() {
        const { borders, id, initialBounds } = this.props;

        const containerStyle = {
            position: 'absolute',
            pointerEvents: 'none',
            ...initialBounds,
        };

        // NOTE(charlie): In some browsers, Aphrodite doesn't seem to flush its
        // styles quickly enough, so there's a flickering effect on the first
        // animation. Thus, it's much safer to do the styles purely inline.
        // <View> makes this difficult because some of its defaults, which are
        // applied via StyleSheet, will override our inlines.
        return <div style={containerStyle}>
            <KeypadButton
                name={id}
                type={keyTypes.ECHO}
                borders={borders}
            />
        </div>;
    },
});

const EchoManager = React.createClass({
    propTypes: {
        echoes: React.PropTypes.arrayOf(echoPropType),
    },

    render() {
        const { echoes } = this.props;

        // TODO(charlie): Manage this animation with Aphrodite styles. Right
        // now, there's a bug in the autoprefixer that breaks CSS transitions on
        // mobile Safari. See: https://github.com/Khan/aphrodite/issues/68. As
        // such, we have to do this with a stylesheet.
        return <ReactCSSTransitionGroup
            transitionName='echo'
            transitionEnter={true}
            transitionLeave={false}
            transitionEnterTimeout={echoAnimationMs}
        >
            {echoes.map(echo => {
                const { animationId } = echo;
                return <Echo key={animationId} {...echo} />;
            })}
        </ReactCSSTransitionGroup>;
    },
});

module.exports = EchoManager;
