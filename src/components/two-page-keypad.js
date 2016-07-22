/**
 * A keypad with two pages of keys.
 */

const React = require('react');
const {connect} = require('react-redux');
const {StyleSheet} = require('aphrodite');

const Keypad = require('./keypad');
const ViewPager = require('./view-pager');
const PagerIndicator = require('./pager-indicator');
const {View} = require('../fake-react-native-web');
const {column, row, fullWidth} = require('./styles');
const {
    innerBorderColor, innerBorderStyle, innerBorderWidthPx, gray85,
} = require('./common-style');

const TwoPageKeypad = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.oneOf([0, 1]).isRequired,
        leftPage: React.PropTypes.node.isRequired,
        paginationEnabled: React.PropTypes.bool.isRequired,
        rightPage: React.PropTypes.node.isRequired,
    },

    render() {
        const {
            currentPage,
            leftPage,
            paginationEnabled,
            rightPage,
        } = this.props;

        if (paginationEnabled) {
            return <Keypad style={[column, styles.keypad]}>
                <PagerIndicator numPages={2} currentPage={currentPage} />
                <View style={styles.borderTop}>
                    <ViewPager>
                        {leftPage}
                        {rightPage}
                    </ViewPager>
                </View>
            </Keypad>;
        } else {
            return <Keypad style={styles.keypad}>
                <View style={row}>
                    <View style={fullWidth}>
                        {leftPage}
                    </View>
                    <View style={[styles.borderLeft, fullWidth]}>
                        {rightPage}
                    </View>
                </View>
            </Keypad>;
        }
    },
});

const styles = StyleSheet.create({
    keypad: {
        // Set the background to light grey, so that when the user drags the
        // keypad pages past the edges, there's a grey backdrop.
        backgroundColor: gray85,
    },

    borderTop: {
        borderTop: `${innerBorderWidthPx}px ${innerBorderStyle} `
            + `${innerBorderColor}`,
    },
    borderLeft: {
        borderLeft: `${innerBorderWidthPx}px ${innerBorderStyle} `
            + `${innerBorderColor}`,
        boxSizing: 'content-box',
    },
});

const mapStateToProps = (state) => {
    return {
        paginationEnabled: state.layout.paginationEnabled,
    };
};

module.exports = connect(mapStateToProps)(TwoPageKeypad);
