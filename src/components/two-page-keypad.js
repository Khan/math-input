/**
 * A keypad with two pages of keys.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const Keypad = require('./keypad');
const { View } = require('../fake-react-native-web');
const { row } = require('./styles');

const TwoPageKeypad = React.createClass({
    propTypes: {
        firstPage: React.PropTypes.node.isRequired,
        page: React.PropTypes.oneOf([0, 1]),
        secondPage: React.PropTypes.node.isRequired,
        sidebar: React.PropTypes.node.isRequired,
    },

    render() {
        const { firstPage, page, secondPage, sidebar } = this.props;

        let transitionStyle;
        if (page === 0) {
            transitionStyle = styles.showFirstPage;
        } else if (page === 1) {
            transitionStyle = styles.showSecondPage;
        } else {
            throw new Error("TwoPageKeypad received invalid page: " + page);
        }

        const pagerStyle = [
            row,
            styles.twoPagePager,
            // Initiate the CSS transition.
            transitionStyle,
        ];

        return <Keypad style={row}>
            <View style={styles.mainContent}>
                <View style={pagerStyle}>
                    {firstPage}
                    {secondPage}
                </View>
            </View>
            {sidebar}
        </Keypad>;
    },
});

const transitionDurationMs = 400;

// NOTE(charlie): All of the pages of all of our multi-page keypads are based
// on a 4x5 layout, regardless of the number of columns that they actually
// have. For simplicity, we encode that information here and use it to define
// the layout. If the layouts change in the future, we can make this a prop.
const numColumns = 5;

const styles = StyleSheet.create({
    mainContent: {
        // The main content (i.e., the non-sidebar keys) should take up all but
        // one of the columns (with the last column being reserved for the
        // sidebar).
        flexBasis: `${100 * (numColumns - 1) / numColumns}%`,
    },

    twoPagePager: {
        width: '200%',
        // Note: By default, <View> sets a `maxWidth` of 100% to fix some
        // Flexbox bugs. We have to override to acheive our desired width of
        // 200%.
        maxWidth: '200%',
        // Animate translations.
        transitionProperty: 'transform',
        transitionDuration: `${transitionDurationMs}ms`,
    },

    // TODO(charlie): Explore using translate3d to kick the GPU in some
    // browsers.
    showFirstPage: {
        transform: 'translateX(0)',
    },

    showSecondPage: {
        transform: 'translateX(-50%)',
    },
});

module.exports = TwoPageKeypad;
