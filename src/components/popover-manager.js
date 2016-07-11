/**
 * A component that renders and animates the popovers that appear over the
 * multi-functional keys.
 */

const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const KeyConfigs = require('../data/key-configs');
const MultiSymbolPopover = require('./multi-symbol-popover');
const {
    boundingBoxPropType,
    keyConfigPropType,
    popoverPropType,
} = require('./prop-types');

// NOTE(charlie): These must be kept in sync with the transition durations and
// classnames specified in popover.css.
const animationTransitionName = 'popover';
const animationDurationMs = 200;

// A container component used to position a popover absolutely at a specific
// position.
const PopoverContainer = React.createClass({
    propTypes: {
        bounds: boundingBoxPropType.isRequired,
        childKeys: React.PropTypes.arrayOf(keyConfigPropType).isRequired,
    },

    render() {
        const {bounds, childKeys} = this.props;

        const containerStyle = {
            position: 'absolute',
            ...bounds,
        };

        return <div style={containerStyle}>
            <MultiSymbolPopover keys={childKeys} />
        </div>;
    },
});

const PopoverManager = React.createClass({
    propTypes: {
        popover: popoverPropType,
    },

    render() {
        const {popover} = this.props;

        return <ReactCSSTransitionGroup
            transitionName={animationTransitionName}
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={animationDurationMs}
            transitionLeaveTimeout={animationDurationMs}
        >
            {popover && <PopoverContainer
                key={popover.childKeyIds[0]}
                bounds={popover.bounds}
                childKeys={popover.childKeyIds.map(id => KeyConfigs[id])}
            />}
        </ReactCSSTransitionGroup>;
    },
});

module.exports = PopoverManager;
