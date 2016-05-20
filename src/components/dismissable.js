/**
 * A wrapper component that manages dismissal for a single child.
 */

const React = require('react');
const createFragment = require('react-addons-create-fragment');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// NOTE(charlie): This must be kept in sync with the transition duration
// specified in dismiss.css.
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
            transitionName='dismissable'
            transitionEnterTimeout={dismissAnimationMs}
            transitionLeaveTimeout={dismissAnimationMs}
        >
            {this.props.active && keyedChild}
        </ReactCSSTransitionGroup>;
    },
});

module.exports = Dismissable;
