/**
 * A component that renders a keypad button.
 */

const React = require('react');
const { connect } = require('react-redux');

const { StyleSheet } = require('aphrodite');
const { Text, View } = require('../fake-react-native-web');
const Icon = require('./icon');
const CornerDecal = require('./corner-decal');
const { keyTypes } = require('../consts');
const { row, column, centered } = require('./styles');
const {
    iconSizeHeightPx, iconSizeWidthPx,
} = require('./common-style');
const { keyConfigPropType } = require('./prop-types');

const KeypadButton = React.createClass({
    propTypes: {
        buttonHeightPx: React.PropTypes.number.isRequired,
        // Any additional keys that can be accessed by long-pressing on the
        // button.
        childKeys: React.PropTypes.arrayOf(keyConfigPropType),
        // The name of the button, used to select the appropriate SVG
        // background image.
        name: React.PropTypes.string,
        style: React.PropTypes.any,
        type: React.PropTypes.oneOf(Object.keys(keyTypes)).isRequired,
    },

    getDefaultProps() {
        return {
            childKeys: [],
        };
    },

    componentWillMount() {
        this.heightStyles = stylesForButtonHeightPx(this.props.buttonHeightPx);
    },

    componentWillUpdate(newProps, newState) {
        // Only recompute the Aphrodite StyleSheet when the button height has
        // changed. Though it is safe to recompute the StyleSheet (since
        // they're content-addressable), it saves us a bunch of hashing and
        // other work to cache it here.
        if (newProps.buttonHeightPx !== this.props.buttonHeightPx) {
            this.heightStyles = stylesForButtonHeightPx(
                newProps.buttonHeightPx
            );
        }
    },

    _getButtonStyle(type, style) {
        // Select the appropriate style for the button, based on the
        // combination of primary and secondary keys.
        let backgroundStyle;
        let borderStyle;
        switch (type) {
            case keyTypes.EMPTY:
                backgroundStyle = styles.disabled;
                borderStyle = styles.bordered;
                break;

            case keyTypes.NUMERAL:
                backgroundStyle = styles.numeral;
                borderStyle = null;
                break;

            case keyTypes.MATH:
                backgroundStyle = styles.command;
                borderStyle = styles.bordered;
                break;

            case keyTypes.INPUT_NAVIGATION:
            case keyTypes.KEYPAD_NAVIGATION:
                backgroundStyle = styles.control;
                borderStyle = null;
                break;
        }

        return [
            styles.buttonBase,
            backgroundStyle,
            borderStyle,
            this.heightStyles.fullHeight,
            // React Native allows you to set the 'style' props on user defined
            // components, https://facebook.github.io/react-native/docs/style.html
            ...(Array.isArray(style) ? style : [style]),
        ];
    },

    render() {
        const {
            childKeys,
            name,
            style,
            type,
        } = this.props;

        const buttonStyle = this._getButtonStyle(type, style);

        if (type === keyTypes.EMPTY) {
            return <View style={buttonStyle} />;
        } else if (type === keyTypes.MANY) {
            // TODO(charlie): Figure out how we're going to get the symbols. We
            // could re-add the symbol logic, but if we end up doing this with
            // SVG as well (i.e., if we need button rescaling), then it's not
            // worthwhile.
            const maxKeysPerColumn = 2;
            return <View style={buttonStyle}>
                <View style={[row, centered, styles.singleIconSize]}>
                    <View style={column}>
                        {childKeys.slice(0, maxKeysPerColumn).map(key =>
                            <Text style={styles.extraSymbolText} key={key.id}>
                                {key.id}
                            </Text>
                        )}
                    </View>
                    <View style={column}>
                        {childKeys.slice(
                            maxKeysPerColumn, 2 * maxKeysPerColumn)
                        .map(key =>
                            <Text style={styles.extraSymbolText} key={key.id}>
                                {key.id}
                            </Text>
                        )}
                    </View>
                </View>
                <CornerDecal />
            </View>;
        } else {
            const hasChildKeys = childKeys && childKeys.length > 0;

            // Render a single symbol, be it a custom symbol or the primary
            // symbol if no custom symbol has been provided.
            return <View style={buttonStyle}>
                <Icon name={name} />
                {hasChildKeys && <CornerDecal />}
            </View>;
        }
    },
});

const styles = StyleSheet.create({
    buttonBase: {
        width: '100%',
        flexDirection: 'row',
        cursor: 'pointer',
        // Make the text unselectable
        userSelect: 'none',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // TODO(charlie): This causes layout weirdness where borders get
    // double-drawn and the margins are off in some places. We need to properly
    // figure out borders, which may require conditional borders being
    // specified as props.
    bordered: {
        borderColor: '#ECECEC',
        borderStyle: 'solid',
        borderWidth: 1,
    },

    // Styles used to create the 'additional symbols' button.
    singleIconSize: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx,
    },

    extraSymbolText: {
        margin: 1,
        // TODO(charlie): Include Proxima and set font appropriately.
        fontSize: 12,
        color: '#888d93',
    },

    // Background colors and other base styles that may vary between key types.
    numeral: {
        backgroundColor: '#FFF',
    },
    command: {
        backgroundColor: '#FAFAFA',
    },
    control: {
        backgroundColor: '#F6F7F7',
    },
    disabled: {
        backgroundColor: '#F0F1F2',
        cursor: 'default',
    },
});

const stylesForButtonHeightPx = (buttonHeightPx) => {
    return StyleSheet.create({
        fullHeight: {
            height: buttonHeightPx,
        },
    });
};

const mapStateToProps = (state) => {
    return state.buttons;
};

module.exports = connect(mapStateToProps)(KeypadButton);
