const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color");

const Keys = require("../../data/key-configs");

const TouchableKeypadButton = require("../touchable-keypad-button");
const ManyKeypadButton = require("../many-keypad-button");

class SecondaryPage extends React.Component {
    render() {
        const {dismissOrJumpOutKey} = this.props;
        return (
            <View
                style={{
                    backgroundColor: "#DBDCDD",
                    width: "100%",
                    height: 256,

                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gridTemplateRows: "repeat(4, 1fr)",
                }}
            >
                {/* Row 1 */}
                <TouchableKeypadButton keyConfig={Keys.PERCENT} />
                <TouchableKeypadButton keyConfig={Keys.PI} />
                <TouchableKeypadButton keyConfig={Keys.ABS} />
                <TouchableKeypadButton keyConfig={Keys.DEGREE} />
                <TouchableKeypadButton keyConfig={Keys.NOOP} />

                {/* Row 2 */}
                <TouchableKeypadButton keyConfig={Keys.ALPHA} />
                <TouchableKeypadButton keyConfig={Keys.BETA} />
                <TouchableKeypadButton keyConfig={Keys.GAMMA} />
                <TouchableKeypadButton keyConfig={Keys.NOOP} />
                <TouchableKeypadButton keyConfig={Keys.NOOP} />

                {/* Row 3 */}
                <TouchableKeypadButton keyConfig={Keys.NOOP} />
                <TouchableKeypadButton keyConfig={Keys.NOOP} />
                <TouchableKeypadButton keyConfig={Keys.NOOP} />
                <TouchableKeypadButton keyConfig={Keys.NOOP} />
                <TouchableKeypadButton keyConfig={Keys.NOOP} />

                {/* Row 4 */}
                <TouchableKeypadButton keyConfig={Keys.NOOP} />
                <TouchableKeypadButton keyConfig={Keys.NOOP} />
                <TouchableKeypadButton keyConfig={Keys.NOOP} />
                <TouchableKeypadButton keyConfig={Keys.BACKSPACE} />
                <TouchableKeypadButton keyConfig={dismissOrJumpOutKey} />
            </View>
        );
    }
}

module.exports = SecondaryPage;
