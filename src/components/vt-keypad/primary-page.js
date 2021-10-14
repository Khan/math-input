const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color");

const KeyConfigs = require("../../data/key-configs");
const Keys = require("../../data/keys");

const TouchableKeypadButton = require("../touchable-keypad-button");
const ManyKeypadButton = require("../many-keypad-button");
const KeyboardWrapper = require("./keyboard-wrapper");
const KeyboardRow = require("./keyboard-row");

class PrimaryPage extends React.Component {
    render() {
        const {dismissOrJumpOutKey} = this.props;
        return (
            <KeyboardWrapper>
                <KeyboardRow rows={6}>
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_7} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_8} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_9} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.PLUS} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NEGATIVE} />
                    <ManyKeypadButton keys={[Keys.SQRT, Keys.CUBE_ROOT, Keys.RADICAL]} />
                </KeyboardRow>

                <KeyboardRow rows={6}>
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_4} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_5} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_6} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.CDOT} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.DIVIDE} />
                    <ManyKeypadButton keys={[Keys.EXP_2, Keys.EXP_3, Keys.EXP]} />
                </KeyboardRow>

                <KeyboardRow rows={6}>
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_1} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_2} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_3} />
                    <ManyKeypadButton keys={[Keys.LEFT_PAREN, Keys.LT, Keys.LEQ]} />
                    <ManyKeypadButton keys={[Keys.RIGHT_PAREN, Keys.GT, Keys.GEQ]} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.BACKSPACE} />
                </KeyboardRow>

                <KeyboardRow rows={6}>
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_0} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.DECIMAL} />
                    <ManyKeypadButton keys={[Keys.EQUAL, Keys.NEQ]} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.PERCENT} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.FRAC} />
                    <TouchableKeypadButton keyConfig={dismissOrJumpOutKey} />
                </KeyboardRow>
            </KeyboardWrapper>
        );
    }
}

module.exports = PrimaryPage;
