import React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import Clickable from "@khanacademy/wonder-blocks-clickable";

type Props = {
    onPress: () => void,
    children: mixed,
    style?: mixed,
};

const styles = StyleSheet.create({
    base: {
        display: "flex",
        justifyContent: "center",
        boxShadow: "0px 1px 0px rgba(33, 36, 44, 0.32)",
        boxSizing: "border-box",
        background: Color.white,
        borderRadius: 4,
        border: `1px solid transparent`,
        flex: 1,
        minHeight: 40,
    },
    hovered: {
        border: `1px solid ${Color.blue}`,
        boxShadow: "none",
    },
    focused: {
        border: `2px solid ${Color.blue}`,
        boxShadow: "none",
    },
    pressed: {
        border: "2px solid #1B50B3",
        background: `linear-gradient(0deg, rgba(24, 101, 242, 0.32), rgba(24, 101, 242, 0.32)), ${Color.white}`,
        boxShadow: "none",
    },
    outerBoxBase: {
        padding: 2,
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 7,
        border: "2px solid transparent",
    },
    outerBoxHover: {
        border: `2px solid ${Color.blue}`,
    },
    outerBoxPressed: {
        border: "2px solid #1B50B3",
    },
});
export default class Button extends React.Component {
    render() {
        const {onPress, children, style} = this.props;
        return (
            <View style={[style]}>
                <Clickable
                    onClick={onPress}
                    style={{
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    {({hovered, focused, pressed}) => {
                        return (
                            <View
                                style={[
                                    styles.outerBoxBase,
                                    hovered && styles.outerBoxHover,
                                    pressed && styles.outerBoxPressed,
                                ]}
                            >
                                <View
                                    style={[
                                        styles.base,
                                        hovered && styles.hovered,
                                        focused && styles.focused,
                                        pressed && styles.pressed,
                                    ]}
                                >
                                    {children}
                                </View>
                            </View>
                        );
                    }}
                </Clickable>
            </View>
        );
    }
}
