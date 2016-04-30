/**
 * A keypad that includes a subset of the expression symbols.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const TouchableKeypadButton = require('./touchable-keypad-button');
const EmptyKeypadButton = require('./empty-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const { row, column, oneColumn, twoColumn, fullWidth } = require('./styles');

const { keyIdPropType } = require('./prop-types');
const KeyConfigs = require('../data/key-configs');

const BasicExpressionKeypad = React.createClass({
    propTypes: {
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        page: React.PropTypes.number.isRequired,
    },

    render() {
        const { extraKeys } = this.props;

        const firstPage = <View style={[row, fullWidth]}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_7} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_4} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_1} />
                <ManyKeypadButton keys={extraKeys} />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_8} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_5} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_2} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_0} />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_9} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_6} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_3} />
                <TouchableKeypadButton keyConfig={KeyConfigs.DECIMAL} />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.FRAC_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.PARENS_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.MINUS} />
                <TouchableKeypadButton keyConfig={KeyConfigs.PLUS} />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.MORE} />
                <TouchableKeypadButton keyConfig={KeyConfigs.RIGHT} />
                <TouchableKeypadButton keyConfig={KeyConfigs.BACKSPACE} />
                <TouchableKeypadButton keyConfig={KeyConfigs.DISMISS} />
            </View>
        </View>;

        const secondPage = <View style={[row, fullWidth]}>
            <View style={[column, twoColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EQUAL_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LESS_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.GREATER_MULTI} />
                <EmptyKeypadButton />
            </View>
            <View style={[column, twoColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EXP_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.RADICAL_MULTI} />
                <EmptyKeypadButton />
                <EmptyKeypadButton />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUMBERS} />
                <TouchableKeypadButton keyConfig={KeyConfigs.RIGHT} />
                <TouchableKeypadButton keyConfig={KeyConfigs.BACKSPACE} />
                <TouchableKeypadButton keyConfig={KeyConfigs.DISMISS} />
            </View>
        </View>;

        return <TwoPageKeypad
            firstPage={firstPage}
            secondPage={secondPage}
            page={this.props.page}
        />;
    },
});

module.exports = BasicExpressionKeypad;
