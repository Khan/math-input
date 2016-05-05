/**
 * A keypad with two pages of keys.
 */

const React = require('react');
const { connect } = require('react-redux');
const { StyleSheet } = require('aphrodite');

const Shadow = require('./shadow');
const Keypad = require('./keypad');
const ViewPager = require('./view-pager');
const { View } = require('../fake-react-native-web');
const { row } = require('./styles');

const TwoPageKeypad = React.createClass({
    propTypes: {
        displayShadow: React.PropTypes.bool,
        firstPage: React.PropTypes.node.isRequired,
        secondPage: React.PropTypes.node.isRequired,
        sidebar: React.PropTypes.node.isRequired,
    },

    render() {
        const { displayShadow, firstPage, secondPage, sidebar } = this.props;

        // NOTE(charlie): Ideally, we would render and manage the shadow in the
        // <Keypad>, and popovers would be displayed on top using z-indexing.
        // Unfortunately, because we're using a transform on the pages in this
        // component, that approach doesn't work due to some unknown interplay
        // between transforms and z-indices. As such, we need to render the
        // shadow here (inside of the node that is being transformed) and,
        // worse still, render it twice. An alternative approach would be to
        // render the popovers absolutely on top of the keypad, similarly to
        // how we render the echoes. But this leads to a bunch of additional
        // complexity and makes the layout far more brittle. If we ever need to
        // display a shadow in a non-two-page keypad, we can add a
        // `displayShadow` prop to the <Keypad> and override it here to render
        // the shadow ourselves in this case.
        return <Keypad style={row}>
            <View style={styles.mainContent}>
                <ViewPager>
                    {firstPage}
                    {secondPage}
                    {displayShadow && <Shadow />}
                </ViewPager>
            </View>
            <View style={styles.sidebarContent}>
                {sidebar}
                {displayShadow && <Shadow />}
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
    mainContent: {
        // The main content (i.e., the non-sidebar keys) should take up all but
        // one of the columns (with the last column being reserved for the
        // sidebar).
        flexBasis: `${100 * (numColumns - 1) / numColumns}%`,
    },

    sidebarContent: {
        flexBasis: `${100 / numColumns}%`,
    },
});

const mapStateToProps = (state) => {
    return {
        displayShadow: !!(state.gestures.popover && state.gestures.focus),
    };
};

module.exports = connect(mapStateToProps)(TwoPageKeypad);
