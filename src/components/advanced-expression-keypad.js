/**
 * A keypad that includes all of the advanced expression symbols.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const EmptyKeypadButton = require('./empty-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const TouchableKeypadButton = require('./touchable-keypad-button');
const { row, column, oneColumn, fullWidth } = require('./styles');

const { keyIdPropType } = require('./prop-types');
const KeyConfigs = require('../data/key-configs');

const AdvancedExpressionKeypad = React.createClass({
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
            <View style={[column, styles.largeColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EQUAL_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LESS_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.GREATER_MULTI} />
                <EmptyKeypadButton />
            </View>
            <View style={[column, styles.largeColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EXP_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.RADICAL_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LOG_MULTI} />
                <EmptyKeypadButton />
            </View>
            <View style={[column, styles.largeColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.SIN} />
                <TouchableKeypadButton keyConfig={KeyConfigs.COS} />
                <TouchableKeypadButton keyConfig={KeyConfigs.TAN} />
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

// On the second page, we want the rightmost column to retain its width from
// the first page (which uses a 5-column layout), and the other three columns
// to equally share the remaining 4/5 of the page. That means the rightmost
// column will have a flexGrow factor of 1, and the remaining three columns
// will share a space 4 times as large. Thus, they each have a flexGrow of 4/3.
const styles = StyleSheet.create({
    largeColumn: {
        flexGrow: 4 / 3,
    },
});

module.exports = AdvancedExpressionKeypad;
