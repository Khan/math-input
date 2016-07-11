/**
 * A component that renders a view pager indicator, with a circular icon for
 * each page.
 */

const React = require('react');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const {gray68, gray85} = require('./common-style');

const PagerIcon = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        radiusPx: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            active: false,
            radiusPx: 4,
        };
    },

    render() {
        const {active, radiusPx} = this.props;

        const fillColor = active ? gray68 : gray85;

        return <svg width={2 * radiusPx} height={2 * radiusPx}>
            <circle
                cx={radiusPx}
                cy={radiusPx}
                r={radiusPx}
                fill={fillColor}
            />
        </svg>;
    },
});

const PagerIndicator = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.number.isRequired,
        numPages: React.PropTypes.number.isRequired,
    },

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
        const dynamicStyles = StyleSheet.create({
            iconStrip: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: totalIconWidthPx + totalSpacingWidthPx,
            },
        });

        return <View style={styles.indicatorStrip}>
            <View style={dynamicStyles.iconStrip}>
                {indicators}
            </View>
        </View>;
    },
});

const styles = StyleSheet.create({
    indicatorStrip: {
        backgroundColor: '#F0F1F2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
    },
});

module.exports = PagerIndicator;
