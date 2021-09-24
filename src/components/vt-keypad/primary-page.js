const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color");

const Keys = require("../../data/key-configs");

const TouchableKeypadButton = require("../touchable-keypad-button");
const ManyKeypadButton = require("../many-keypad-button");

class PrimaryPage extends React.Component {
    render() {
        const {dismissOrJumpOutKey} = this.props;
        return (
            <View
                style={{
                    backgroundColor: "#DBDCDD",
                    width: "100%",
                    // height: 256,

                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gridTemplateRows: "repeat(4, 1fr)",
                }}
            >
                {/* Row 1 */}
                <TouchableKeypadButton keyConfig={Keys.NUM_7} />
                <TouchableKeypadButton keyConfig={Keys.NUM_8} />
                <TouchableKeypadButton keyConfig={Keys.NUM_9} />
                <TouchableKeypadButton keyConfig={Keys.CDOT} />
                <TouchableKeypadButton keyConfig={Keys.DIVIDE} />

                {/* Row 2 */}
                <TouchableKeypadButton keyConfig={Keys.NUM_4} />
                <TouchableKeypadButton keyConfig={Keys.NUM_5} />
                <TouchableKeypadButton keyConfig={Keys.NUM_6} />

                <ManyKeypadButton keys={["SQRT", "CUBE_ROOT", "RADICAL"]} />
                <ManyKeypadButton keys={["EXP_2", "EXP_3", "EXP"]} />

                {/* Row 3 */}
                <TouchableKeypadButton keyConfig={Keys.NUM_1} />
                <TouchableKeypadButton keyConfig={Keys.NUM_2} />
                <TouchableKeypadButton keyConfig={Keys.NUM_3} />
                <TouchableKeypadButton keyConfig={Keys.PLUS} />
                <TouchableKeypadButton keyConfig={Keys.NEGATIVE} />

                {/* Row 4 */}
                <TouchableKeypadButton keyConfig={Keys.NUM_0} />
                <TouchableKeypadButton keyConfig={Keys.DECIMAL} />
                <TouchableKeypadButton keyConfig={Keys.FRAC} />
                <TouchableKeypadButton keyConfig={Keys.BACKSPACE} />
                <TouchableKeypadButton keyConfig={dismissOrJumpOutKey} />
            </View>
        );
    }
}

module.exports = PrimaryPage;
