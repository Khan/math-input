// @flow
import React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import Clickable from "@khanacademy/wonder-blocks-clickable";

const styles = StyleSheet.create({
    base: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 1px 0px rgba(33, 36, 44, 0.32)",
        boxSizing: "border-box",
        background: Color.white,
        borderRadius: 4,
        border: `1px solid transparent`,
        flex: 1,
        minHeight: 42,
        minWidth: 42,
        padding: 1,
    },
    hovered: {
        border: `1px solid ${Color.blue}`,
        padding: 1,
        boxShadow: "none",
    },
    focused: {
        border: `2px solid ${Color.blue}`,
        padding: 0,
        boxShadow: "none",
    },
    pressed: {
        border: "2px solid #1B50B3",
        padding: 0,
        background: `linear-gradient(0deg, rgba(24, 101, 242, 0.32), rgba(24, 101, 242, 0.32)), ${Color.white}`,
        boxShadow: "none",
    },
    outerBoxBase: {
        padding: 1,
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

type Props = {
    onPress: () => void,
    children: mixed,
    style?: mixed,
    tintColor?: string,
};

type State = {};
export default class Button extends React.Component<Props, State> {
    render() {
        const {onPress, children, style, tintColor} = this.props;
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
                                        tintColor && {background: tintColor},
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
