const React = require('react');
const {StyleSheet, css} = require('aphrodite');

const View = React.createClass({
    propTypes: {
        ariaLabel: React.PropTypes.string,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node,
        ]),
        // The `dynamicStyle` prop is provided for animating dynamic
        // properties, as creating Aphrodite StyleSheets in animation loops is
        // expensive. `dynamicStyle` should be a raw style object, rather than
        // a StyleSheet.
        dynamicStyle: React.PropTypes.any,
        numberOfLines: React.PropTypes.number,
        onClick: React.PropTypes.func,
        onTouchCancel: React.PropTypes.func,
        onTouchEnd: React.PropTypes.func,
        onTouchMove: React.PropTypes.func,
        onTouchStart: React.PropTypes.func,
        role: React.PropTypes.string,
        style: React.PropTypes.any,
    },

    statics: {
        styles: StyleSheet.create({
            // From: https://github.com/necolas/react-native-web/blob/master/src/components/View/index.js
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
                minWidth: 0,
            },
        }),
    },

    render() {
        const className = css(
            View.styles.initial,
            ...(Array.isArray(this.props.style) ? this.props.style
                                                : [this.props.style])
        );

        return <div
            className={className}
            style={this.props.dynamicStyle}
            onClick={this.props.onClick}
            onTouchCancel={this.props.onTouchCancel}
            onTouchEnd={this.props.onTouchEnd}
            onTouchMove={this.props.onTouchMove}
            onTouchStart={this.props.onTouchStart}
            aria-label={this.props.ariaLabel}
            role={this.props.role}
        >
            {this.props.children}
        </div>;
    },
});

module.exports = View;
