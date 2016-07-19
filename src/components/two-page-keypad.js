/**
 * A keypad with two pages of keys.
 */

const React = require('react');
const {StyleSheet} = require('aphrodite');

const Keypad = require('./keypad');
const ViewPager = require('./view-pager');
const PagerIndicator = require('./pager-indicator');
const {View} = require('../fake-react-native-web');
const {column, row} = require('./styles');
const {
    buttonBorderColor, buttonBorderStyle, buttonBorderWidthPx, gray85,
} = require('./common-style');

const TwoPageKeypad = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.oneOf([0, 1]).isRequired,
        firstPage: React.PropTypes.node.isRequired,
        secondPage: React.PropTypes.node.isRequired,
        sidebar: React.PropTypes.node.isRequired,
    },

    render() {
        const {
            currentPage,
            firstPage,
            secondPage,
            sidebar,
        } = this.props;

        const keypadContentsStyle = [
            row,
            styles.borderTop,
        ];

        return <Keypad style={[column, styles.keypad]}>
            <PagerIndicator numPages={2} currentPage={currentPage} />
            <View style={keypadContentsStyle}>
                <View style={styles.mainContent}>
                    <ViewPager>
                        {firstPage}
                        {secondPage}
                    </ViewPager>
                </View>
                <View style={styles.sidebarContent}>
                    {sidebar}
                </View>
            </View>
        </Keypad>;
    },
});

// NOTE(charlie): All of the pages of all of our multi-page keypads are based
// on a 4x5 layout, regardless of the number of columns that they actually
// have. For simplicity, we encode that information here and use it to define
// the layout. If the layouts change in the future, we can make this a prop.
const numColumns = 5;

const styles = StyleSheet.create({
    keypad: {
        // Set the background to light grey, so that when the user drags the
        // keypad pages past the edges, there's a grey backdrop.
        backgroundColor: gray85,
    },

    mainContent: {
        // The main content (i.e., the non-sidebar keys) should take up all but
        // one of the columns (with the last column being reserved for the
        // sidebar).
        flexBasis: `${100 * (numColumns - 1) / numColumns}%`,
    },

    sidebarContent: {
        flexBasis: `${100 / numColumns}%`,
    },

    borderBottom: {
        borderBottom: `${buttonBorderWidthPx}px ${buttonBorderStyle} `
            + `${buttonBorderColor}`,
    },
    borderTop: {
        borderTop: `${buttonBorderWidthPx}px ${buttonBorderStyle} `
            + `${buttonBorderColor}`,
    },
});

module.exports = TwoPageKeypad;
