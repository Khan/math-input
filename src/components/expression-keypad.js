/**
 * A keypad that includes all of the expression symbols.
 */

const React = require('react');
const {connect} = require('react-redux');
const {StyleSheet} = require('aphrodite');

const {View} = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const ManyKeypadButton = require('./many-keypad-button');
const TouchableKeypadButton = require('./touchable-keypad-button');
const {row, column, oneColumn, fullWidth} = require('./styles');
const {BorderStyles, JumpOutTypes} = require('../consts');
const {
    buttonBorderColor,
    buttonBorderWidthPx,
    valueGrey,
    controlGrey,
} = require('./common-style');
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

        const rightPageStyle = [row, fullWidth, styles.rightPage];
        const rightPage = <View style={rightPageStyle}>
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
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DIVIDE}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.TIMES}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.MINUS}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.PLUS}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton keyConfig={KeyConfigs.FRAC_INCLUSIVE} />
                <TouchableKeypadButton keyConfig={KeyConfigs.CDOT} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.BACKSPACE}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={dismissOrJumpOutKey}
                    borders={BorderStyles.LEFT}
                />
            </View>
        </View>;

        const leftPageStyle = [row, fullWidth, styles.leftPage];
        const leftPage = <View style={leftPageStyle}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EXP_2}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.SQRT}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LOG}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.SIN}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EXP_3}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.CUBE_ROOT}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LN}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EXP}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.RADICAL}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LOG_N}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.TAN}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.GEQ}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EQUAL}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton keyConfig={KeyConfigs.LEQ} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LEFT_PAREN}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn, styles.rightBorder]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.GT}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NEQ}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LT}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.RIGHT_PAREN}
                    borders={BorderStyles.NONE}
                />
            </View>
        </View>;

        return <TwoPageKeypad
            currentPage={currentPage}
            rightPage={rightPage}
            leftPage={leftPage}
        />;
    },
});

const styles = StyleSheet.create({
    // NOTE(charlie): These backgrounds are applied to as to fill in some
    // unfortunate 'cracks' in the layout. However, not all keys in the first
    // page use this background color (namely, the 'command' keys, backspace and
    // dismiss).
    // TODO(charlie): Apply the proper background between the 'command' keys.
    rightPage: {
        backgroundColor: valueGrey,
    },

    leftPage: {
        backgroundColor: controlGrey,
    },

    rightBorder: {
        borderRightWidth: buttonBorderWidthPx,
        borderColor: buttonBorderColor,
    },
});

const mapStateToProps = (state) => {
    return {
        currentPage: state.pager.currentPage,
        cursorContext: state.input.cursor.context,
    };
};

module.exports = connect(mapStateToProps)(ExpressionKeypad);
