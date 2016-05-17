/**
 * A keypad that includes all of the advanced expression symbols.
 */

const React = require('react');
const { connect } = require('react-redux');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const EmptyKeypadButton = require('./empty-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const TouchableKeypadButton = require('./touchable-keypad-button');
const { row, column, oneColumn } = require('./styles');
const { BorderStyles, SwitchTypes, JumpOutTypes } = require('../consts');
const { cursorContextPropType, keyIdPropType } = require('./prop-types');
const KeyConfigs = require('../data/key-configs');
const CursorContexts = require('./input/cursor-contexts');
const { keypadSwitch, jumpOutType } = require('../settings');

const AdvancedExpressionKeypad = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.number.isRequired,
        cursorContext: cursorContextPropType.isRequired,
        dynamicJumpOut: React.PropTypes.bool,
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        showToggle: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
            dynamicJumpOut: jumpOutType === JumpOutTypes.DYNAMIC,
            showToggle: keypadSwitch === SwitchTypes.TOGGLE,
        };
    },

    render() {
        const {
            currentPage, cursorContext, dynamicJumpOut, extraKeys, showToggle,
        } = this.props;

        const firstPage = <View style={[row, styles.fullPage]}>
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
        </View>;

        const secondPage = <View style={[row, styles.fullPage]}>
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
        </View>;

        // TODO(charlie): Simplify after user-testing.
        let topNavigationKey;
        let goRightNavigationKey;
        if (showToggle) {
            topNavigationKey = currentPage === 0 ? KeyConfigs.MORE
                                                 : KeyConfigs.NUMBERS;
            goRightNavigationKey = KeyConfigs.JUMP_OUT;
        } else {
            topNavigationKey = KeyConfigs.LEFT;
            goRightNavigationKey = KeyConfigs.RIGHT;
        }

        let dismissOrJumpOutKey;
        if (dynamicJumpOut && cursorContext === CursorContexts.NESTED) {
            dismissOrJumpOutKey = KeyConfigs.JUMP_OUT;
        } else {
            dismissOrJumpOutKey = KeyConfigs.DISMISS;
        }

        const sidebar = <View style={[column, oneColumn]}>
            <TouchableKeypadButton
                keyConfig={topNavigationKey}
                borders={BorderStyles.LEFT}
            />
            {dynamicJumpOut ? <EmptyKeypadButton
                borders={BorderStyles.LEFT}
            /> : <TouchableKeypadButton
                keyConfig={goRightNavigationKey}
                borders={BorderStyles.LEFT}
            />}
            <TouchableKeypadButton
                keyConfig={KeyConfigs.BACKSPACE}
                borders={BorderStyles.LEFT}
            />
            <TouchableKeypadButton
                keyConfig={dismissOrJumpOutKey}
                borders={BorderStyles.LEFT}
            />
        </View>;

        return <TwoPageKeypad
            currentPage={currentPage}
            firstPage={firstPage}
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

const mapStateToProps = (state) => {
    return {
        currentPage: state.pager.currentPage,
        cursorContext: state.input.cursor.context,
    };
};

module.exports = connect(mapStateToProps)(AdvancedExpressionKeypad);
