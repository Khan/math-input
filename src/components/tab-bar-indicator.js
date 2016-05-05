/**
 * A component that renders a tab bar with titles for each tab and an underline
 * to indicate the active tab.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { Text, View } = require('../fake-react-native-web');
const { brightGreen, darkGrey } = require('./common-style');

const Tab = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        title: React.PropTypes.string.isRequired,
    },

    getInitialState() {
        return {
            focused: false,
        };
    },

    _onTouchStart() {
        this.setState({ focused: true });
    },

    _onTouchEnd() {
        this.setState({ focused: false });
    },

    render() {
        const { active, onClick, title } = this.props;
        const { focused } = this.state;

        let underlineColorStyle;
        let textColorStyle;
        if (active && focused) {
            underlineColorStyle = styles.activeFocused;
            textColorStyle = styles.activeFocusedText;
        } else if (active && !focused) {
            underlineColorStyle = styles.active;
            textColorStyle = styles.activeText;
        } else if (!active && !focused) {
            underlineColorStyle = styles.inactive;
            textColorStyle = styles.inactiveText;
        } else if (!active && focused) {
            underlineColorStyle = styles.inactiveFocused;
            textColorStyle = styles.inactiveFocusedText;
        }

        const titleStyle = [
            styles.tabTitleText,
            textColorStyle,
        ];

        const underlineStyle = [
            styles.tabUnderline,
            underlineColorStyle,
        ];

        // TODO(charlie): Use `onTouchEnd` rather than `onClick` to avoid
        // delay. This requires verifying that the touch ended in the view.
        return <View
            style={styles.tab}
            onClick={onClick}
            onTouchStart={() => this._onTouchStart()}
            onTouchEnd={() => this._onTouchEnd()}
        >
            <Text style={titleStyle}>{title}</Text>
            {active && <View style={underlineStyle} />}
        </View>;
    },
});

const TabBarIndicator = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.number.isRequired,
        onSelectTab: React.PropTypes.func,
        pageTitles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    },

    render() {
        const { currentPage, onSelectTab, pageTitles } = this.props;

        const tabTitles = pageTitles.map((title, i) => {
            return <Tab
                key={i}
                active={i === currentPage}
                onClick={() => onSelectTab(i)}
                title={title}
            />;
        });

        return <View style={styles.tabBar}>
            {tabTitles}
        </View>;
    },
});

// The width beyond which the tab bar underline extends past the edges of the
// title for that tab.
const tabUnderlineExtraWidthPx = 10;

const activeColor = brightGreen;
const inactiveColor = darkGrey;
const activeFocusedColor = '#518005';
const inactiveFocusedColor = '#71B307';

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
    },

    tab: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: tabUnderlineExtraWidthPx,
        paddingRight: tabUnderlineExtraWidthPx,
    },

    tabTitleText: {
        fontSize: 14,
        fontFamily: 'Proxima Nova Semibold',
        userSelect: 'none',
        color: inactiveColor,
    },

    activeTabTitleText: {
        color: activeColor,
    },

    tabUnderline: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderRadius: 2,
        height: 2,
    },

    active: {
        backgroundColor: activeColor,
    },
    activeText: {
        color: activeColor,
    },
    inactive: {
        backgroundColor: inactiveColor,
    },
    inactiveText: {
        color: inactiveColor,
    },
    activeFocused: {
        backgroundColor: activeFocusedColor,
    },
    activeFocusedText: {
        color: activeFocusedColor,
    },
    inactiveFocused: {
        backgroundColor: inactiveFocusedColor,
    },
    inactiveFocusedText: {
        color: inactiveFocusedColor,
    },
});

module.exports = TabBarIndicator;
