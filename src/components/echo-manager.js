/**
 * A component that renders and animates the selection state effect effect.
 */

const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const { removeEcho } = require('../actions');
const KeypadButton = require('./keypad-button');
const KeyConfigs = require('../data/key-configs');
const { KeyTypes, EchoAnimationTypes } = require('../consts');
const {
    echoPropType, bordersPropType, boundingBoxPropType, keyIdPropType,
} = require('./prop-types');
const Settings = require('../settings');

const Echo = React.createClass({
    propTypes: {
        animationDurationMs: React.PropTypes.number.isRequired,
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
        const { animationDurationMs, animationId } = this.props;
        setTimeout(() => removeEcho(animationId), animationDurationMs);
    },

    render() {
        const { borders, id, initialBounds } = this.props;
        const { unicodeSymbol } = KeyConfigs[id];

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
                unicodeSymbol={unicodeSymbol}
                type={KeyTypes.ECHO}
                borders={borders}
            />
        </div>;
    },
});

const EchoManager = React.createClass({
    propTypes: {
        animationType: React.PropTypes.oneOf(Object.keys(EchoAnimationTypes)),
        echoes: React.PropTypes.arrayOf(echoPropType),
    },

    getDefaultProps() {
        return {
            animationType: Settings.echoAnimation,
        };
    },

    _animationConfigForType(animationType) {
        // NOTE(charlie): These must be kept in sync with the transition
        // durations and classnames specified in echo.css.
        let animationDurationMs;
        let animationTransitionName;

        switch (animationType) {
            case EchoAnimationTypes.SLIDE_AND_FADE:
                animationDurationMs = 400;
                animationTransitionName = 'echo-slide-and-fade';
                break;

            case EchoAnimationTypes.FADE_ONLY:
                animationDurationMs = 300;
                animationTransitionName = 'echo-fade-only';
                break;

            default:
                throw new Error(
                    "Invalid echo animation type:", animationType);
        }

        return {
            animationDurationMs,
            animationTransitionName,
        };
    },

    render() {
        const { animationType, echoes } = this.props;
        const {
            animationDurationMs, animationTransitionName,
        } = this._animationConfigForType(animationType);

        // TODO(charlie): Manage this animation with Aphrodite styles. Right
        // now, there's a bug in the autoprefixer that breaks CSS transitions on
        // mobile Safari. See: https://github.com/Khan/aphrodite/issues/68. As
        // such, we have to do this with a stylesheet.
        return <ReactCSSTransitionGroup
            transitionName={animationTransitionName}
            transitionEnter={true}
            transitionLeave={false}
            transitionEnterTimeout={animationDurationMs}
        >
            {echoes.map(echo => {
                const { animationId } = echo;
                return <Echo
                    key={animationId}
                    animationDurationMs={animationDurationMs}
                    {...echo}
                />;
            })}
        </ReactCSSTransitionGroup>;
    },
});

module.exports = EchoManager;
