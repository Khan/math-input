/**
 * A keypad that includes a subset of the expression symbols.
 */

const React = require('react');
const { connect } = require('react-redux');
const { StyleSheet } = require('aphrodite');

const { setKeypadCurrentPage } = require('../actions');
const { View } = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const EmptyKeypadButton = require('./empty-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const TouchableKeypadButton = require('./touchable-keypad-button');
const { row, column, oneColumn } = require('./styles');
const { BorderStyles, SwitchTypes, JumpOutTypes } = require('../consts');
const { numeralGrey, commandGrey } = require('./common-style');
const { cursorContextPropType, keyIdPropType } = require('./prop-types');
const KeyConfigs = require('../data/key-configs');
const CursorContexts = require('./input/cursor-contexts');
const { keypadSwitch, jumpOutType } = require('../settings');

const BasicExpressionKeypad = React.createClass({
    propTypes: {
        currentPage: React.PropTypes.number.isRequired,
        cursorContext: cursorContextPropType.isRequired,
        dynamicJumpOut: React.PropTypes.bool,
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        onSelectTab: React.PropTypes.func,
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
            currentPage,
            cursorContext,
            dynamicJumpOut,
            extraKeys,
            onSelectTab,
            showToggle,
        } = this.props;

        const firstPageStyle = [row, styles.fullPage, styles.firstPage];
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
                <EmptyKeypadButton />
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

        const sidebar = <View style={[column, oneColumn, styles.sidebar]}>
            <TouchableKeypadButton
                keyConfig={topNavigationKey}
                borders={BorderStyles.LEFT}
                disabled={
                    cursorContext === CursorContexts.LEFT_END ||
                    cursorContext === CursorContexts.EMPTY
                }
            />
            {dynamicJumpOut ? <EmptyKeypadButton
                borders={BorderStyles.LEFT}
            /> : <TouchableKeypadButton
                keyConfig={goRightNavigationKey}
                borders={BorderStyles.LEFT}
                disabled={
                    cursorContext === CursorContexts.RIGHT_END ||
                    cursorContext === CursorContexts.EMPTY
                }
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
            onSelectTab={onSelectTab}
        />;
    },
});

const styles = StyleSheet.create({
    fullPage: {
        flexBasis: '100%',
    },

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

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectTab: (tabIndex) => {
            dispatch(setKeypadCurrentPage(tabIndex));
        },
    };
};

module.exports = connect(
    mapStateToProps, mapDispatchToProps
)(BasicExpressionKeypad);
