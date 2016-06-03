/**
 * A keypad with two pages of keys.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const Keypad = require('./keypad');
const ViewPager = require('./view-pager');
const TabBarIndicator = require('./tab-bar-indicator');
const PagerIndicator = require('./pager-indicator');
const { View } = require('../fake-react-native-web');
const { column, row } = require('./styles');
const {
    buttonBorderColor, buttonBorderStyle, buttonBorderWidthPx, lightGrey,
} = require('./common-style');
const { SwitchTypes } = require('../consts');
const { keypadSwitch } = require('../settings');

const TwoPageKeypad = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.oneOf([0, 1]).isRequired,
        firstPage: React.PropTypes.node.isRequired,
        onSelectTab: React.PropTypes.func,
        secondPage: React.PropTypes.node.isRequired,
        showPagerIndicator: React.PropTypes.bool,
        showTabBarIndicator: React.PropTypes.bool,
        sidebar: React.PropTypes.node.isRequired,
    },

    getDefaultProps() {
        return {
            showPagerIndicator: keypadSwitch === SwitchTypes.PAGE_CONTROL,
            showTabBarIndicator: keypadSwitch === SwitchTypes.TAB_BAR,
        };
    },

    render() {
        const {
            currentPage,
            firstPage,
            onSelectTab,
            secondPage,
            showPagerIndicator,
            showTabBarIndicator,
            sidebar,
        } = this.props;

        const keypadContentsStyle = [
            row,
            (showPagerIndicator || showTabBarIndicator) && styles.borderTop,
        ];

        return <Keypad style={[column, styles.keypad]}>
            {showTabBarIndicator &&
                <TabBarIndicator
                    currentPage={currentPage}
                    onSelectTab={onSelectTab}
                    pageTitles={['Basic', 'Advanced']}
                />
            }
            {showPagerIndicator &&
                <PagerIndicator numPages={2} currentPage={currentPage} />
            }
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
        backgroundColor: lightGrey,
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
