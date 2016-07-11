/**
 * A view pager that allows for pagination in the horizontal direction.
 * Right now, there are a number of limitations built into the system. Namely:
 *  - It only supports pagination in the horizontal direction.
 *  - It supports exactly two pages.
 */

const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const {row} = require('./styles');
const {setPageWidthPx} = require('../actions');
const {childrenPropType} = require('./prop-types');

const ViewPager = React.createClass({
    propTypes: {
        // Whether the page should animate to its next specified position.
        animateToPosition: React.PropTypes.bool,
        children: childrenPropType,
        onPageWidthPxChange: React.PropTypes.func.isRequired,
        translateX: React.PropTypes.number.isRequired,
    },

    getInitialState() {
        return {
            animationDurationMs: 0,
        };
    },

    componentDidMount() {
        window.addEventListener("resize", this._onResize);

        this._pagerContainer = ReactDOM.findDOMNode(this);
        this._shouldMeasureContainer = true;
    },

    componentWillReceiveProps(newProps) {
        // NOTE(charlie): We can't measure the container immediately in
        // componentDidMount, as the layout pass hasn't occurred yet.
        if (this._shouldMeasureContainer) {
            this._updatePageWidth();
            this._shouldMeasureContainer = false;
        }

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

    componentWillUnmount() {
        window.removeEventListener("resize", this._onResize);
    },

    _updatePageWidth() {
        // Instead of immediately calculating the width, we give time for the
        // parent keypad to be rerendered. This can be removed once the new
        // layout for landscape screens is introduced, where there is only
        // one page.
        setTimeout(() => {
            if (this.isMounted()) {
                this.props.onPageWidthPxChange(
                    this._pagerContainer.offsetWidth);
            }
        });
    },

    _onResize() {
        // Whenever the page resizes, we need to force an update to recompute
        // the width of the view pager's pages.

        // Throttle resize events -- taken from:
        //    https://developer.mozilla.org/en-US/docs/Web/Events/resize
        if (this._resizeTimeout == null) {
            this._resizeTimeout = setTimeout(() => {
                this._resizeTimeout = null;

                // Notify that the pager width has changed.
                this._updatePageWidth();
            }, 66);
        }
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

const mapDispatchToProps = (dispatch) => {
    return {
        onPageWidthPxChange: (pageWidthPx) => {
            dispatch(setPageWidthPx(pageWidthPx));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ViewPager);
