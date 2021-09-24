/**
 * A keypad that includes all of the expression symbols.
 */

const React = require("react");
const PropTypes = require("prop-types");
const {connect} = require("react-redux");
const {StyleSheet} = require("aphrodite");

const {View} = require("../fake-react-native-web");
const VTKeypadWrapper = require("./vt-keypad/wrapper");
const Keypad = require("./keypad");
const TwoPageKeypad = require("./two-page-keypad");
const TouchableKeypadButton = require("./touchable-keypad-button");
const {
    row,
    column,
    oneColumn,
    fullWidth,
    roundedTopLeft,
    roundedTopRight,
} = require("./styles");
const {BorderStyles} = require("../consts");
const {valueGrey, controlGrey, vtGrey} = require("./common-style");
const {cursorContextPropType, keyIdPropType} = require("./prop-types");
const KeyConfigs = require("../data/key-configs");
const CursorContexts = require("./input/cursor-contexts");

// VT: This is based on ExpressionKeypad
class CustomVTMathKeypad extends React.Component {
    static propTypes = {
        currentPage: PropTypes.number.isRequired,
        cursorContext: cursorContextPropType.isRequired,
        dynamicJumpOut: PropTypes.bool,
        extraKeys: PropTypes.arrayOf(keyIdPropType),
        roundTopLeft: PropTypes.bool,
        roundTopRight: PropTypes.bool,
    };

    static rows = 4;
    static columns = 5;

    // Though we include an infinite-key popover in the bottom-left, it's
    // assumed that we don't need to accommodate cases in which that key
    // contains more than four children.
    static maxVisibleRows = 4;

    static numPages = 2;

    render() {
        const {
            currentPage,
            cursorContext,
            dynamicJumpOut,
            extraKeys,
            roundTopLeft,
            roundTopRight,
            onKeypadSizeChange,
        } = this.props;

        let dismissOrJumpOutKey;
        if (dynamicJumpOut) {
            switch (cursorContext) {
                case CursorContexts.IN_PARENS:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_PARENTHESES;
                    break;

                case CursorContexts.IN_SUPER_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_EXPONENT;
                    break;

                case CursorContexts.IN_SUB_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_BASE;
                    break;

                case CursorContexts.BEFORE_FRACTION:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_INTO_NUMERATOR;
                    break;

                case CursorContexts.IN_NUMERATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_NUMERATOR;
                    break;

                case CursorContexts.IN_DENOMINATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_DENOMINATOR;
                    break;

                case CursorContexts.NONE:
                default:
                    dismissOrJumpOutKey = KeyConfigs.DISMISS;
                    break;
            }
        } else {
            dismissOrJumpOutKey = KeyConfigs.DISMISS;
        }

        return (
            <Keypad style={styles.keypad}>
                <VTKeypadWrapper
                    dismissOrJumpOutKey={dismissOrJumpOutKey}
                    onKeypadSizeChange={onKeypadSizeChange}
                />
            </Keypad>
        );
    }
}

const styles = StyleSheet.create({
    keypad: {
        // Set the background to light grey, so that when the user drags the
        // keypad pages past the edges, there's a grey backdrop.
        backgroundColor: vtGrey,
    },
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
});

const mapStateToProps = (state) => {
    return {
        currentPage: state.pager.currentPage,
        cursorContext: state.input.cursor.context,
        dynamicJumpOut: !state.layout.navigationPadEnabled,
    };
};

module.exports = connect(mapStateToProps)(CustomVTMathKeypad);
