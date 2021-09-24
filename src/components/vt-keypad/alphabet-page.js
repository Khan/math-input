const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color");

const Keys = require("../../data/key-configs");

const TouchableKeypadButton = require("../touchable-keypad-button");
const ManyKeypadButton = require("../many-keypad-button");
const {connect} = require("react-redux");

class PrimaryPage extends React.Component {
    render() {
        const {dismissOrJumpOutKey} = this.props;
        return (
            <View
                style={{
                    backgroundColor: "#DBDCDD",
                    width: "100%",
                    height: 256,
                }}
            >
                <View
                    style={{
                        backgroundColor: "#DBDCDD",
                        width: "100%",

                        display: "grid",
                        gridTemplateColumns: "repeat(10, 1fr)",
                        gridTemplateRows: "repeat(1, 1fr)",
                    }}
                >
                    {/* Row 1 */}

                    <ManyKeypadButton keys={["q", "Q"]} />
                    <ManyKeypadButton keys={["w", "W"]} />
                    <ManyKeypadButton keys={["e", "E", "ę", "Ę"]} />
                    <ManyKeypadButton keys={["r", "R"]} />
                    <ManyKeypadButton keys={["t", "T"]} />
                    <ManyKeypadButton keys={["y", "Y"]} />
                    <ManyKeypadButton keys={["u", "U"]} />
                    <ManyKeypadButton keys={["i", "I"]} />
                    <ManyKeypadButton keys={["o", "O", "ó", "Ó"]} />
                    <ManyKeypadButton keys={["p", "P"]} />
                </View>
                <View
                    style={{
                        backgroundColor: "#DBDCDD",
                        width: "100%",

                        display: "grid",
                        gridTemplateColumns: "repeat(11, 1fr)",
                        gridTemplateRows: "repeat(1, 1fr)",
                    }}
                >
                    {/* Row 2 */}
                    <TouchableKeypadButton keyConfig={Keys.NOOP} borders={[]} />
                    <ManyKeypadButton keys={["a", "A", "ą", "Ą"]} />
                    <ManyKeypadButton keys={["s", "S"]} />
                    <ManyKeypadButton keys={["d", "D"]} />
                    <ManyKeypadButton keys={["f", "F"]} />
                    <ManyKeypadButton keys={["g", "G"]} />
                    <ManyKeypadButton keys={["h", "H"]} />
                    <ManyKeypadButton keys={["j", "J"]} />
                    <ManyKeypadButton keys={["k", "K"]} />
                    <ManyKeypadButton keys={["l", "L"]} />
                    <TouchableKeypadButton keyConfig={Keys.NOOP} borders={[]} />
                </View>
                <View
                    style={{
                        backgroundColor: "#DBDCDD",
                        width: "100%",

                        display: "grid",
                        gridTemplateColumns: "repeat(9, 1fr)",
                        gridTemplateRows: "repeat(1, 1fr)",
                    }}
                >
                    {/* Row 3 */}
                    <TouchableKeypadButton keyConfig={Keys.NOOP} borders={[]} />

                    <ManyKeypadButton keys={["z", "Z", "ź", "Ź", "ż", "Ż"]} />
                    <ManyKeypadButton keys={["x", "X"]} />
                    <ManyKeypadButton keys={["c", "C", "ć", "Ć"]} />
                    <ManyKeypadButton keys={["v", "V"]} />
                    <ManyKeypadButton keys={["b", "B"]} />
                    <ManyKeypadButton keys={["n", "N", "ń", "Ń"]} />
                    <ManyKeypadButton keys={["m", "M"]} />
                    <TouchableKeypadButton keyConfig={Keys.NOOP} borders={[]} />
                </View>
                <View
                    style={{
                        backgroundColor: "#DBDCDD",
                        width: "100%",

                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gridTemplateRows: "repeat(1, 1fr)",
                    }}
                >
                    <TouchableKeypadButton keyConfig={Keys.NOOP} borders={[]} />
                    <TouchableKeypadButton keyConfig={Keys.NOOP} borders={[]} />
                    <TouchableKeypadButton keyConfig={Keys.NOOP} borders={[]} />
                    <TouchableKeypadButton keyConfig={Keys.BACKSPACE} />
                    <TouchableKeypadButton keyConfig={dismissOrJumpOutKey} />
                </View>
            </View>
        );
    }
}

module.exports = PrimaryPage;
