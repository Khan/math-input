const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color");

const Keys = require("../../data/key-configs");

const TouchableKeypadButton = require("../touchable-keypad-button");
const ManyKeypadButton = require("../many-keypad-button");
const KeyboardWrapper = require("./keyboard-wrapper");
const KeyboardRow = require("./keyboard-row");
const { PlaceHolderButton } = require("../keypad/keypad-page-items");

class SecondaryPage extends React.Component {
    render() {
        const {dismissOrJumpOutKey} = this.props;
        return (
            <KeyboardWrapper>
                <KeyboardRow rows={6}>
                    <TouchableKeypadButton keyConfig={Keys.DEGREE} />
                    <TouchableKeypadButton keyConfig={Keys.PI} />
                    <TouchableKeypadButton keyConfig={Keys.ABS} />
                </KeyboardRow>

                <KeyboardRow rows={6}>
                    <TouchableKeypadButton keyConfig={Keys.ALPHA} />
                    <TouchableKeypadButton keyConfig={Keys.BETA} />
                    <TouchableKeypadButton keyConfig={Keys.GAMMA} />
                </KeyboardRow>

                <KeyboardRow rows={6}>
                    <TouchableKeypadButton keyConfig={Keys.SIN} />
                    <TouchableKeypadButton keyConfig={Keys.COS} />
                    <TouchableKeypadButton keyConfig={Keys.TAN} />
                    <TouchableKeypadButton keyConfig={Keys.CTG} />
                    <div />
                    <TouchableKeypadButton keyConfig={Keys.BACKSPACE} />
                </KeyboardRow>

                <KeyboardRow rows={6}>
                    <TouchableKeypadButton keyConfig={Keys.LN} />
                    <TouchableKeypadButton keyConfig={Keys.LOG} />
                    <TouchableKeypadButton keyConfig={Keys.LOG_N} />
                    <div />
                    <div />
                    <TouchableKeypadButton keyConfig={dismissOrJumpOutKey} />
                </KeyboardRow>
            </KeyboardWrapper>
        );
    }
}

module.exports = SecondaryPage;
