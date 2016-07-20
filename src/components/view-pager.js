/**
 * A view pager that allows for pagination in the horizontal direction.
 * Right now, there are a number of limitations built into the system. Namely:
 *  - It only supports pagination in the horizontal direction.
 *  - It supports exactly two pages.
 */

const React = require('react');
const {connect} = require('react-redux');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const {row} = require('./styles');
const {childrenPropType} = require('./prop-types');

const ViewPager = React.createClass({
    propTypes: {
        // Whether the page should animate to its next specified position.
        animateToPosition: React.PropTypes.bool,
        children: childrenPropType,
        translateX: React.PropTypes.number.isRequired,
    },

    getInitialState() {
        return {
            animationDurationMs: 0,
        };
    },

    componentWillReceiveProps(newProps) {
        // Compute the appropriate animation length, if the pager should
        // animate to its next position.
        let animationDurationMs;
        if (newProps.animateToPosition) {
            const finalTranslateX = newProps.translateX;
            const prevTranslateX = this.props.translateX;

            // We animate at a rate of 1 pixel per millisecond, and thus we can
            // use the displacement as the animation duration.
            animationDurationMs = Math.abs(finalTranslateX - prevTranslateX);
        } else {
            animationDurationMs = 0;
        }
        this.setState({
            animationDurationMs,
        });
    },

    render() {
        const {translateX, children} = this.props;
        const {animationDurationMs} = this.state;

        const pagerStyle = [row, styles.twoPagePager];

        const transform = {
            msTransform: `translate3d(${translateX}px, 0, 0)`,
            WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
            transform: `translate3d(${translateX}px, 0, 0)`,
        };
        const animate = animationDurationMs ? {
            msTransitionProperty: 'transform',
            WebkitTransitionProperty: 'transform',
            transitionProperty: 'transform',
            msTransitionDuration: `${animationDurationMs}ms`,
            WebkitTransitionDuration: `${animationDurationMs}ms`,
            transitionDuration: `${animationDurationMs}ms`,
            msTransitionTimingFunction: 'ease-out',
            WebkitTransitionTimingFunction: 'ease-out',
            transitionTimingFunction: 'ease-out',
        } : {};
        const dynamicStyle = {
            ...transform,
            ...animate,
        };

        return <View>
            <View style={pagerStyle} dynamicStyle={dynamicStyle}>
                {children}
            </View>
        </View>;
    },
});

const styles = StyleSheet.create({
    twoPagePager: {
        width: '200%',
        // Note: By default, <View> sets a `maxWidth` of 100% to fix some
        // Flexbox bugs. We have to override to acheive our desired width of
        // 200%.
        maxWidth: '200%',
    },
});

const mapStateToProps = (state) => {
    const {animateToPosition, currentPage, dx, pageWidthPx} = state.pager;
    return {
        animateToPosition,
        translateX: -currentPage * pageWidthPx + dx,
    };
};

module.exports = connect(mapStateToProps)(ViewPager);
