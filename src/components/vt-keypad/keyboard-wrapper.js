const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");

class KeyboardWrapper extends React.Component {
    render() {
        const {children} = this.props;
        const style = {
            backgroundColor: "#DBDCDD",
            width: "100%",
            height: 256 - 64,
        };

        return <View style={style}>{children}</View>;
    }
}

module.exports = KeyboardWrapper;
