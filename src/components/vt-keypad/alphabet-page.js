const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color");

const KeyConfigs = require("../../data/key-configs");

const TouchableKeypadButton = require("../touchable-keypad-button");
const ManyKeypadButton = require("../many-keypad-button");
const {connect} = require("react-redux");
const KeyboardWrapper = require("./keyboard-wrapper");
const KeyboardRow = require("./keyboard-row");

class PrimaryPage extends React.Component {
    render() {
        const {dismissOrJumpOutKey} = this.props;
        return (
            <KeyboardWrapper>
                <KeyboardRow rows={10}>
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_1} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_2} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_3} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_4} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_5} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_6} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_7} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_8} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_9} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.NUM_0} />
                </KeyboardRow>
                <KeyboardRow rows={10}>
                    <ManyKeypadButton keys={["q", "Q"]} />
                    <ManyKeypadButton keys={["w", "W"]} />
                    <ManyKeypadButton keys={["e", "ę", "E", "Ę"]} />
                    <ManyKeypadButton keys={["r", "R"]} />
                    <ManyKeypadButton keys={["t", "T"]} />
                    <ManyKeypadButton keys={["y", "Y"]} />
                    <ManyKeypadButton keys={["u", "U"]} />
                    <ManyKeypadButton keys={["i", "I"]} />
                    <ManyKeypadButton keys={["o", "ó", "O", "Ó"]} />
                    <ManyKeypadButton keys={["p", "P"]} />
                </KeyboardRow>
                <KeyboardRow rows={11}>
                    <div />
                    <ManyKeypadButton keys={["a", "ą", "A", "Ą"]} />
                    <ManyKeypadButton keys={["s", "ś", "S", "Ś"]} />
                    <ManyKeypadButton keys={["d", "D"]} />
                    <ManyKeypadButton keys={["f", "F"]} />
                    <ManyKeypadButton keys={["g", "G"]} />
                    <ManyKeypadButton keys={["h", "H"]} />
                    <ManyKeypadButton keys={["j", "J"]} />
                    <ManyKeypadButton keys={["k", "K"]} />
                    <ManyKeypadButton keys={["l", "ł", "L", "Ł"]} />
                    <TouchableKeypadButton keyConfig={KeyConfigs.BACKSPACE} />
                </KeyboardRow>
                <KeyboardRow rows={9}>
                    <div />
                    <ManyKeypadButton keys={["z", "ż", "ź", "Z", "Ż", "Ź"]} />
                    <ManyKeypadButton keys={["x", "X"]} />
                    <ManyKeypadButton keys={["c", "C", "ć", "Ć"]} />
                    <ManyKeypadButton keys={["v", "V"]} />
                    <ManyKeypadButton keys={["b", "B"]} />
                    <ManyKeypadButton keys={["n", "ń", "N", "Ń"]} />
                    <ManyKeypadButton keys={["m", "M"]} />
                    <TouchableKeypadButton keyConfig={dismissOrJumpOutKey} />
                </KeyboardRow>
            </KeyboardWrapper>
        );
    }
}

module.exports = PrimaryPage;
