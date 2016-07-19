/**
 * A keypad that includes all of the expression symbols.
 */

const React = require('react');
const {connect} = require('react-redux');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const EmptyKeypadButton = require('./empty-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const TouchableKeypadButton = require('./touchable-keypad-button');
const {row, column, oneColumn, fullFlex} = require('./styles');
const {BorderStyles, JumpOutTypes} = require('../consts');
const {numeralGrey, commandGrey} = require('./common-style');
const {cursorContextPropType, keyIdPropType} = require('./prop-types');
const KeyConfigs = require('../data/key-configs');
const CursorContexts = require('./input/cursor-contexts');
const {jumpOutType} = require('../settings');

const ExpressionKeypad = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.number.isRequired,
        cursorContext: cursorContextPropType.isRequired,
        dynamicJumpOut: React.PropTypes.bool,
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
    },

    getDefaultProps() {
        return {
            dynamicJumpOut: jumpOutType === JumpOutTypes.DYNAMIC,
        };
    },

    render() {
        const {
            currentPage,
            cursorContext,
            dynamicJumpOut,
            extraKeys,
        } = this.props;

        let dismissOrJumpOutKey;
        if (dynamicJumpOut && cursorContext === CursorContexts.NESTED) {
            dismissOrJumpOutKey = KeyConfigs.JUMP_OUT;
        } else {
            dismissOrJumpOutKey = KeyConfigs.DISMISS;
        }

        const sidebar = <View style={[column, oneColumn, styles.sidebar]}>
            <TouchableKeypadButton
                keyConfig={KeyConfigs.LEFT}
                borders={BorderStyles.LEFT}
                disabled={
                    cursorContext === CursorContexts.LEFT_END ||
                    cursorContext === CursorContexts.EMPTY
                }
            />
            <TouchableKeypadButton
                keyConfig={KeyConfigs.RIGHT}
                borders={BorderStyles.LEFT}
                disabled={
                    cursorContext === CursorContexts.RIGHT_END ||
                    cursorContext === CursorContexts.EMPTY
                }
            />
            <TouchableKeypadButton
                keyConfig={KeyConfigs.BACKSPACE}
                borders={BorderStyles.LEFT}
            />
            <TouchableKeypadButton
                keyConfig={dismissOrJumpOutKey}
                borders={BorderStyles.LEFT}
            />
        </View>;

        const firstPageStyle = [row, fullFlex, styles.firstPage];
        const firstPage = <View style={firstPageStyle}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_7}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_4}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_1}
                    borders={BorderStyles.BOTTOM}
                />
                <ManyKeypadButton
                    keys={extraKeys}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_8}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_5}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_2}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_0}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_9}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_6}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_3}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DECIMAL}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.FRAC_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.PARENS_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.MINUS} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.PLUS}
                    borders={BorderStyles.LEFT}
                />
            </View>
            {sidebar}
        </View>;

        const secondPage = <View style={[row, fullFlex]}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EQUAL_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LESS_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.GREATER_MULTI} />
                <EmptyKeypadButton borders={BorderStyles.LEFT} />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.EXP_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.RADICAL_MULTI} />
                <TouchableKeypadButton keyConfig={KeyConfigs.LOG_MULTI} />
                <EmptyKeypadButton borders={BorderStyles.LEFT} />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.SIN} />
                <TouchableKeypadButton keyConfig={KeyConfigs.COS} />
                <TouchableKeypadButton keyConfig={KeyConfigs.TAN} />
                <EmptyKeypadButton borders={BorderStyles.LEFT} />
            </View>
            {sidebar}
        </View>;

        return <TwoPageKeypad
            currentPage={currentPage}
            firstPage={firstPage}
            secondPage={secondPage}
        />;
    },
});

const styles = StyleSheet.create({
    firstPage: {
        backgroundColor: numeralGrey,
    },

    sidebar: {
        backgroundColor: commandGrey,
    },
});

const mapStateToProps = (state) => {
    return {
        currentPage: state.pager.currentPage,
        cursorContext: state.input.cursor.context,
    };
};

module.exports = connect(mapStateToProps)(ExpressionKeypad);
