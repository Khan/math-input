/**
 * A component that renders and animates the selection state effect effect.
 */

const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const { StyleSheet, css } = require('aphrodite');
const { removeEcho } = require('../actions');
const KeypadButton = require('./keypad-button');
const { keyTypes, borderStyles } = require('../consts');
const {
    echoPropType, boundingBoxPropType, keyIdPropType,
} = require('./prop-types');

const echoAnimationMs = 1000;

const Echo = React.createClass({
    propTypes: {
        animationId: React.PropTypes.string.isRequired,
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
        const { id, initialBounds } = this.props;

        const dynamicStyles = StyleSheet.create({
            positioning: initialBounds,
        });

        return <KeypadButton
            name={id}
            type={keyTypes.ECHO}
            borders={borderStyles.NONE}
            style={[styles.container, dynamicStyles.positioning]}
        />;
    },
});

const EchoManager = React.createClass({
    propTypes: {
        echoes: React.PropTypes.arrayOf(echoPropType),
    },

    render() {
        const { echoes } = this.props;

        // TODO(charlie): This works perfectly in the emulator but not at all
        // on mobile Safari, due to a bug in Aphrodite.
        //   See: https://github.com/Khan/aphrodite/issues/68
        return <ReactCSSTransitionGroup
            transitionName={{
                enter: css(styles.enter),
                enterActive: css(styles.enterActive),
            }}
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

const echoAnimationOffsetY = 50;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        pointerEvents: 'none',
    },

    enter: {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
    },

    enterActive: {
        opacity: 0,
        transform: `translate3d(0, -${echoAnimationOffsetY}px, 0)`,
        transition: `transform ${echoAnimationMs}ms, `
            + `opacity ${echoAnimationMs}ms`,
    },
});

module.exports = EchoManager;
