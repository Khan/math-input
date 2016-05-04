/**
 * A keypad with two pages of keys.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const Keypad = require('./keypad');
const ViewPager = require('./view-pager');
const { View } = require('../fake-react-native-web');
const { row } = require('./styles');

const TwoPageKeypad = React.createClass({
    propTypes: {
        firstPage: React.PropTypes.node.isRequired,
        secondPage: React.PropTypes.node.isRequired,
        sidebar: React.PropTypes.node.isRequired,
    },

    render() {
        const { firstPage, secondPage, sidebar } = this.props;

        return <Keypad style={row}>
            <View style={styles.mainContent}>
                <ViewPager>
                    {firstPage}
                    {secondPage}
                </ViewPager>
            </View>
            {sidebar}
        </Keypad>;
    },
});

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
});

module.exports = TwoPageKeypad;
