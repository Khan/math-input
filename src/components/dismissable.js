/**
 * A wrapper component that manages dismissal for a single child.
 */

const React = require('react');
const createFragment = require('react-addons-create-fragment');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const { StyleSheet, css } = require('aphrodite');

const dismissAnimationMs = 300;

const Dismissable = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        children: React.PropTypes.node.isRequired,
        id: React.PropTypes.string.isRequired,
    },

    render() {
        const { children, id } = this.props;
        const keyedChild = createFragment({
            [id]: React.Children.only(children),
        });

        return <ReactCSSTransitionGroup
            transitionName={{
                enter: css(styles.enter),
                enterActive: css(styles.enterActive),
                leave: css(styles.leave),
                leaveActive: css(styles.leaveActive),
                appear: css(styles.appear),
                appearActive: css(styles.appearActive),
            }}
            transitionAppear={true}
            transitionAppearTimeout={dismissAnimationMs}
            transitionEnterTimeout={dismissAnimationMs}
            transitionLeaveTimeout={dismissAnimationMs}
        >
            {this.props.active && keyedChild}
        </ReactCSSTransitionGroup>;
    },
});

const styles = StyleSheet.create({
    enter: {
        transform: 'translateY(100%)',
    },

    enterActive: {
        transform: `translateY(0)`,
        transition: `transform ${dismissAnimationMs}ms ease-out`,
    },

    leave: {
        transform: 'translateY(0)',
    },

    leaveActive: {
        transform: 'translateY(100%)',
        transition: `transform ${dismissAnimationMs}ms ease-out`,
    },

    appear: {
        transform: 'translateY(100%)',
    },

    appearActive: {
        transform: `translateY(0)`,
        transition: `transform ${dismissAnimationMs}ms ease-out`,
    },
});

module.exports = Dismissable;
