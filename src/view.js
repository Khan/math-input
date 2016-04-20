const React = require('react');
const { StyleSheet, css } = require('aphrodite');

const View = (props) => {
    const className = Array.isArray(props.style)
        ? css(styles.initial, ...props.style)
        : css(styles.initial, props.style);

    return <div onClick={props.onClick} className={className}>
        {props.children}
    </div>;
};

// https://github.com/necolas/react-native-web/blob/master/src/components/View/index.js
const styles = StyleSheet.create({
    initial: {
        alignItems: 'stretch',
        borderWidth: 0,
        borderStyle: 'solid',
        boxSizing: 'border-box',
        display: 'flex',
        flexBasis: 'auto',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        position: 'relative',
        // button and anchor reset
        backgroundColor: 'transparent',
        color: 'inherit',
        font: 'inherit',
        textAlign: 'inherit',
        textDecorationLine: 'none',
        // list reset
        listStyle: 'none',
        // fix flexbox bugs
        maxWidth: '100%',
        minHeight: 0,
        minWidth: 0
    }
});

module.exports = View;
