const React = require("react");

const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color");

const TabbarItem = require("./item");

const styles = StyleSheet.create({
    tabbar: {
        display: "flex",
        flexDirection: "row",
        background: Color.offWhite,
        paddingTop: 2,
        paddingBottom: 2,
        borderTop: `1px solid ${Color.offBlack50}`,
        borderBottom: `1px solid ${Color.offBlack50}`,
    },
});

class Tabbar extends React.Component {
    state = {
        selectedItem: 0,
    };
    render() {
        const {items, onSelect} = this.props;
        return (
            <View style={styles.tabbar}>
                {items.map((item, index) => (
                    <TabbarItem
                        key={`tabbar-item-${index}`}
                        itemState={
                            index === this.state.selectedItem
                                ? "active"
                                : "inactive"
                        }
                        itemType={item}
                        onClick={() => {
                            this.setState({selectedItem: index});
                            onSelect(item);
                        }}
                    />
                ))}
            </View>
        );
    }
}

module.exports = Tabbar;
