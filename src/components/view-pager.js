/**
 * A view pager that allows for pagination in the horizontal direction.
 * Right now, there are a number of limitations built into the system. Namely:
 *  - It only supports pagination in the horizontal direction.
 *  - It supports exactly two pages.
 */

const React = require("react");
const PropTypes = require("prop-types");
const {connect} = require("react-redux");
const {StyleSheet} = require("aphrodite");

const {View} = require("../fake-react-native-web");
const {row} = require("./styles");
const {childrenPropType} = require("./prop-types");
const {
    innerBorderColor,
    innerBorderStyle,
    innerBorderWidthPx,
} = require("./common-style");

class ViewPager extends React.Component {
    static propTypes = {
        // Whether the page should animate to its next specified position.
        animateToPosition: PropTypes.bool,
        children: childrenPropType,
        pageWidthPx: PropTypes.number.isRequired,
        translateX: PropTypes.number.isRequired,
    };

    state = {
        animationDurationMs: 0,
    };

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
    }

    render() {
        const {children, pageWidthPx, translateX} = this.props;
        const {animationDurationMs} = this.state;

        const pagerStyle = [row, styles.twoPagePager];

        const transform = {
            msTransform: `translate3d(${translateX}px, 0, 0)`,
            WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
            transform: `translate3d(${translateX}px, 0, 0)`,
        };
        const animate = animationDurationMs
            ? {
                  msTransitionProperty: "transform",
                  WebkitTransitionProperty: "transform",
                  transitionProperty: "transform",
                  msTransitionDuration: `${animationDurationMs}ms`,
                  WebkitTransitionDuration: `${animationDurationMs}ms`,
                  transitionDuration: `${animationDurationMs}ms`,
                  msTransitionTimingFunction: "ease-out",
                  WebkitTransitionTimingFunction: "ease-out",
                  transitionTimingFunction: "ease-out",
              }
            : {};
        const dynamicPagerStyle = {
            ...transform,
            ...animate,
        };

        const dynamicPageStyle = {
            width: pageWidthPx,
        };

        return (
            <View style={pagerStyle} dynamicStyle={dynamicPagerStyle}>
                <View dynamicStyle={dynamicPageStyle}>{children[0]}</View>
                <View style={styles.rightPage} dynamicStyle={dynamicPageStyle}>
                    {children[1]}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    twoPagePager: {
        alignSelf: "flex-start",
        // Note: By default, <View> sets a `maxWidth` of 100% to fix some
        // Flexbox bugs. We have to override it to accommodate for our two
        // pages. The exact value here isn't super important, as long as it's
        // large enough to accommodate for two pages (so, 200%) and some
        // separators.
        maxWidth: "250%",
    },

    rightPage: {
        borderLeft:
            `${innerBorderWidthPx}px ${innerBorderStyle} ` +
            `${innerBorderColor}`,
        boxSizing: "content-box",
    },
});

const mapStateToProps = (state) => {
    const {animateToPosition, currentPage, dx, pageWidthPx} = state.pager;
    return {
        animateToPosition,
        pageWidthPx,
        translateX: -currentPage * (pageWidthPx + innerBorderWidthPx) + dx,
    };
};

module.exports = connect(mapStateToProps)(ViewPager);
