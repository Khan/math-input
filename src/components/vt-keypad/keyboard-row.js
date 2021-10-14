const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");

class KeyboardRow extends React.Component {
    render() {
        const {children, rows} = this.props;
        const style = {
            backgroundColor: "#DBDCDD",
            width: "100%",

            display: "grid",
            gridTemplateColumns: `repeat(${rows}, 1fr)`,
            gridTemplateRows: "repeat(1, 1fr)",
        };

        return <View style={style}>{children}</View>;
    }
}

module.exports = KeyboardRow;
