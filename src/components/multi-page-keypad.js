/**
 * A keypad with two pages of keys.
 */

const React = require('react');
const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { StyleSheet } = require('aphrodite');

const Keypad = require('./keypad');
const ViewPager = require('./view-pager');
const PagerIndicator = require('./pager-indicator');
const { View } = require('../fake-react-native-web');
const { column, row, fullWidth } = require('./styles');
const {
    innerBorderColor, innerBorderStyle, innerBorderWidthPx, gray85,
} = require('./common-style');

class TwoPageKeypad extends React.Component {
    static propTypes = {
        currentPage: PropTypes.number.isRequired,
        children: PropTypes.node.isRequired,
        paginationEnabled: PropTypes.bool.isRequired,
    };

    render() {
        const {
            currentPage,
            children,
            paginationEnabled,
        } = this.props;

        if (paginationEnabled) {
            return <Keypad style={[column, styles.keypad]}>
                <PagerIndicator numPages={React.Children.count(children)} currentPage={currentPage} />
                <View style={styles.borderTop}>
                    <ViewPager children={children} />
                </View>
            </Keypad>;
        } else {
            return <Keypad style={styles.keypad}>
                <View style={row}>
                    {
                        React.Children.map(children, (child) => {
                            return (
                                <View style={fullWidth}>
                                    {child}
                                </View>
                            )
                        })
                    }
                </View>
            </Keypad>;
        }
    }
}

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
