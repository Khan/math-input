const React = require("react");

const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color");
const Clickable = require("@khanacademy/wonder-blocks-clickable");

const Tabbar = require("../tabbar/tabbar");
const PrimaryPage = require("./primary-page");
const Secondary = require("./secondary-page");
const Tertiary = require("./tertiary-page");
const Alphabet = require("./alphabet-page");

class VTKeypadWrapper extends React.Component {
    state = {
        selectedPage: "Numbers",
    };
    componentDidUpdate() {
        const {selectedPage} = this.state;
        const {onKeypadSizeChange} = this.props;

        if (selectedPage === "Alphabet") {
            // rows, columns, maxVisibleRows, numPages
            onKeypadSizeChange(4, undefined, 4, 3);
        } else {
            onKeypadSizeChange(4, 5, 4, 3);
        }
    }
    render() {
        const {selectedPage} = this.state;
        const {dismissOrJumpOutKey} = this.props;

        const availablePages = ["Numbers", "Operators", "Geometry", "Alphabet"];
        return (
            <View>
                <Tabbar
                    items={availablePages}
                    onSelect={(tabbarItem) => {
                        this.setState({selectedPage: tabbarItem});
                    }}
                />
                {selectedPage === "Numbers" && (
                    <PrimaryPage dismissOrJumpOutKey={dismissOrJumpOutKey} />
                )}
                {selectedPage === "Operators" && (
                    <Secondary dismissOrJumpOutKey={dismissOrJumpOutKey} />
                )}
                {selectedPage === "Geometry" && (
                    <Tertiary dismissOrJumpOutKey={dismissOrJumpOutKey} />
                )}
                {selectedPage === "Alphabet" && (
                    <Alphabet dismissOrJumpOutKey={dismissOrJumpOutKey} />
                )}
            </View>
        );
    }
}

module.exports = VTKeypadWrapper;
