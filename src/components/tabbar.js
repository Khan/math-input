// @flow

import React from "react";

import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

type Props = {
    onPress: () => void,
};

type State = {};

const styles = StyleSheet.create({
    base: {
        display: "flex",
        width: 44,
        height: 38,
        boxSizing: "border-box",
        borderRadius: 3,
    },
    hovered: {
        background:
            "linear-gradient(0deg, rgba(24, 101, 242, 0.32), rgba(24, 101, 242, 0.32)), #FFFFFF",
        border: "1px solid #1865F2",
    },
    pressed: {
        background: "#1B50B3",
    },
    focused: {
        outline: "none",
        border: "2px solid #1865F2",
    },
    innerBox: {
        dislay: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    innerBoxPressed: {
        border: `2px solid ${Color.white}`,
        borderRadius: 2,
    },
});

export class TabbarItem extends React.Component<Props, State> {
    imageTintColor(
        hovered: boolean,
        focused: boolean,
        pressed: boolean,
    ): string {
        if (pressed) {
            return Color.white;
        } else if (hovered) {
            return Color.blue;
        }
        return Color.offBlack64;
    }
    render() {
        const {onPress} = this.props;
        return (
            <Clickable onClick={onPress}>
                {({hovered, focused, pressed}) => (
                    <View
                        style={[
                            styles.base,
                            hovered && styles.hovered,
                            focused && styles.focused,
                            pressed && styles.pressed,
                        ]}
                    >
                        <View
                            style={[
                                styles.innerBox,
                                pressed && styles.innerBoxPressed,
                            ]}
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7.57584 7.09442C7.92723 6.92984 8.3421 6.98339 8.64018 7.23179L26.6402 22.2318C26.9636 22.5013 27.0836 22.9446 26.9403 23.3404C26.7969 23.7363 26.421 24 26 24H8C7.44772 24 7 23.5523 7 23V8.00001C7 7.61199 7.22446 7.259 7.57584 7.09442ZM9 10.1351V17H13C13.5523 17 14 17.4477 14 18V22H23.238L9 10.1351ZM12 22V19H9V22H12Z"
                                    fill={this.imageTintColor(
                                        hovered,
                                        focused,
                                        pressed,
                                    )}
                                />
                            </svg>
                        </View>
                    </View>
                )}
            </Clickable>
        );
    }
}
