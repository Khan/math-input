/**
 * A component that renders a view pager indicator, with a circular icon for
 * each page.
 */

const React = require('react');
const PropTypes = require('prop-types');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const {pageIndicatorHeightPx, offBlack50, offBlack16} = require('./common-style');

class PagerIcon extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        radiusPx: PropTypes.number,
    };

    static defaultProps = {
        active: false,
        radiusPx: 4,
    };

    render() {
        const {active, radiusPx} = this.props;

        const fillColor = active ? offBlack50 : offBlack16;

        return <svg width={2 * radiusPx} height={2 * radiusPx}>
            <circle
                cx={radiusPx}
                cy={radiusPx}
                r={radiusPx}
                fill={fillColor}
            />
        </svg>;
    }
}

class PagerIndicator extends React.Component {
    static propTypes = {
        currentPage: PropTypes.number.isRequired,
        numPages: PropTypes.number.isRequired,
    };

    render() {
        const {currentPage, numPages} = this.props;

        const pagerIconRadiusPx = 4;

        // Collect the various indicator circles.
        const indicators = [];
        for (let i = 0; i < numPages; i++) {
            indicators.push(
                <PagerIcon
                    key={i}
                    active={i === currentPage}
                    radiusPx={pagerIconRadiusPx}
                />
            );
        }

        // Size the box that contains the icons to accommodate for proper
        // spacing, and let Flexbox take care of the details.
        const totalIconWidthPx = 2 * pagerIconRadiusPx * numPages;
        const totalSpacingWidthPx = 2 * pagerIconRadiusPx * (numPages - 1);
        const iconStripSize = {
            width: totalIconWidthPx + totalSpacingWidthPx,
        };

        return <View style={styles.indicatorStrip}>
            <View style={styles.iconStrip} dynamicStyle={iconStripSize}>
                {indicators}
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    indicatorStrip: {
        backgroundColor: '#F0F1F2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: pageIndicatorHeightPx,
    },
    iconStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

module.exports = PagerIndicator;
