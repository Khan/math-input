/**
 * A keypad that includes a subset of the expression symbols.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const TouchableKeypadButton = require('./touchable-keypad-button');
const EmptyKeypadButton = require('./empty-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const { row, column, oneColumn } = require('./styles');
const { borderStyles } = require('../consts');
const { keyIdPropType } = require('./prop-types');
const KeyConfigs = require('../data/key-configs');

const BasicExpressionKeypad = React.createClass({
    propTypes: {
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        page: React.PropTypes.number.isRequired,
    },

    render() {
        const { extraKeys } = this.props;

        const firstPage = <View style={[row, styles.fullPage]}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_7}
                    borders={borderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_4}
                    borders={borderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_1}
                    borders={borderStyles.BOTTOM}
                />
                <ManyKeypadButton
                    keys={extraKeys}
                    borders={borderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_8} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_5} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_2} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_0}
                    borders={borderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_9} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_6} />
                <TouchableKeypadButton keyConfig={KeyConfigs.NUM_3} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DECIMAL}
                    borders={borderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.FRAC_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.PARENS_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.MINUS} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.PLUS}
                    borders={borderStyles.LEFT}
                />
            </View>
        </View>;

        const secondPage = <View style={[row, styles.fullPage]}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EQUAL_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LESS_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.GREATER_MULTI} />
                <EmptyKeypadButton borders={borderStyles.LEFT} />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EXP_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.RADICAL_MULTI} />
                <EmptyKeypadButton />
                <EmptyKeypadButton borders={borderStyles.LEFT} />
            </View>
        </View>;

        const switchPageKey = this.props.page === 0 ? KeyConfigs.MORE
                                                    : KeyConfigs.NUMBERS;
        const sidebar = <View style={[column, oneColumn]}>
            <TouchableKeypadButton
                key={switchPageKey.id}
                keyConfig={switchPageKey}
                borders={borderStyles.LEFT}
            />
            <TouchableKeypadButton
                keyConfig={KeyConfigs.RIGHT}
                borders={borderStyles.LEFT}
            />
            <TouchableKeypadButton
                keyConfig={KeyConfigs.BACKSPACE}
                borders={borderStyles.LEFT}
            />
            <TouchableKeypadButton
                keyConfig={KeyConfigs.DISMISS}
                borders={borderStyles.LEFT}
            />
        </View>;

        return <TwoPageKeypad
            firstPage={firstPage}
            page={this.props.page}
            secondPage={secondPage}
            sidebar={sidebar}
        />;
    },
});

const styles = StyleSheet.create({
    fullPage: {
        flexBasis: '100%',
    },
});

module.exports = BasicExpressionKeypad;
