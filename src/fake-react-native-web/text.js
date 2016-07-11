const React = require('react');
const {StyleSheet, css} = require('aphrodite');

const Text = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node,
        ]),
        numberOfLines: React.PropTypes.number,
        style: React.PropTypes.any,
    },

    render() {
        const {numberOfLines, style} = this.props;

        const className = css(
            styles.initial,
            ...(Array.isArray(style) ? style : [style]),
            numberOfLines === 1 && styles.singleLineStyle
        );

        return <span className={className}>
            {this.props.children}
        </span>;
    },
});

// https://github.com/necolas/react-native-web/blob/master/src/components/Text/index.js
const styles = StyleSheet.create({
    initial: {
        color: 'inherit',
        display: 'inline',
        font: 'inherit',
        margin: 0,
        padding: 0,
        textDecorationLine: 'none',
        wordWrap: 'break-word',
    },
    singleLineStyle: {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

module.exports = Text;
