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
const {DeviceTypes} = require('../consts');
const {
    buttonBorderColor, buttonBorderStyle, buttonBorderWidthPx, gray85,
} = require('./common-style');

const TwoPageKeypad = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.oneOf([0, 1]).isRequired,
        deviceType: React.PropTypes.oneOf(Object.keys(DeviceTypes)),
        firstPage: React.PropTypes.node.isRequired,
        secondPage: React.PropTypes.node.isRequired,
    },

    render() {
        const {
            currentPage,
            deviceType,
            firstPage,
            secondPage,
        } = this.props;

        if (deviceType === DeviceTypes.TABLET) {
            return <Keypad style={styles.keypad}>
                <View style={row}>
                    <View style={fullWidth}>
                        {firstPage}
                    </View>
                    <View style={fullWidth}>
                        {secondPage}
                    </View>
                </View>
            </Keypad>;
        } else {
            // TODO(charlie): Implement phone, landscape layout.
            return <Keypad style={[column, styles.keypad]}>
                <PagerIndicator numPages={2} currentPage={currentPage} />
                <View style={styles.borderTop}>
                    <ViewPager>
                        {firstPage}
                        {secondPage}
                    </ViewPager>
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
        borderTop: `${buttonBorderWidthPx}px ${buttonBorderStyle} `
            + `${buttonBorderColor}`,
    },
});

const mapStateToProps = (state) => {
    return {
        deviceType: state.layout.deviceType,
    };
};

module.exports = connect(mapStateToProps)(TwoPageKeypad);
