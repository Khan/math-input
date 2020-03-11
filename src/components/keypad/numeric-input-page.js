import React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import Button from "./button";
import Keys from "../../data/key-configs";
import ButtonAsset from "./button-assets";

import type {KeyConfig} from "../../data/key-configs";
type Props = {
    onClickKey: (keyConfig: KeyConfig) => void,
};
type State = {};
export default class NumericInputPage extends React.Component<Props, State> {
    render() {
        const {onClickKey} = this.props;
        return (
            <View
                style={{
                    backgroundColor: "#DBDCDD",
                    width: "100%",
                    height: 192,

                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gridTemplateRows: "repeat(4, 1fr)",
                }}
            >
                <Button onPress={() => onClickKey(Keys.NUM_7.id)}>
                    <ButtonAsset id={Keys.NUM_7.id} />
                </Button>
                <Button onPress={() => onClickKey(Keys.NUM_8.id)}>
                    <ButtonAsset id={Keys.NUM_8.id} />
                </Button>
                <Button onPress={() => onClickKey(Keys.NUM_9.id)}>
                    <ButtonAsset id={Keys.NUM_9.id} />
                </Button>
                <Button
                    onPress={() => onClickKey(Keys.TIMES.id)}
                    tintColor={"#F6F6F7"}
                >
                    <ButtonAsset id={Keys.TIMES.id} />
                </Button>
                <Button
                    onPress={() => onClickKey(Keys.LEFT_PAREN.id)}
                    tintColor={"#F6F6F7"}
                >
                    <ButtonAsset id={Keys.LEFT_PAREN.id} />
                </Button>
                <Button
                    onPress={() => onClickKey(Keys.RIGHT_PAREN.id)}
                    tintColor={"#F6F6F7"}
                >
                    <ButtonAsset id={Keys.RIGHT_PAREN.id} />
                </Button>

                <Button onPress={() => onClickKey(Keys.NUM_4.id)}>
                    <ButtonAsset id={Keys.NUM_4.id} />
                </Button>
                <Button onPress={() => onClickKey(Keys.NUM_5.id)}>
                    <ButtonAsset id={Keys.NUM_5.id} />
                </Button>
                <Button onPress={() => onClickKey(Keys.NUM_6.id)}>
                    <ButtonAsset id={Keys.NUM_6.id} />
                </Button>
                <Button
                    onPress={() => onClickKey(Keys.MINUS.id)}
                    tintColor={"#F6F6F7"}
                >
                    <ButtonAsset id={Keys.MINUS.id} />
                </Button>
                <Button
                    style={{
                        gridColumn: "5 / 7",
                    }}
                    onPress={() => onClickKey(Keys.FRAC_INCLUSIVE.id)}
                    tintColor={"#F6F6F7"}
                >
                    <ButtonAsset id={Keys.FRAC_INCLUSIVE.id} />
                </Button>

                <Button onPress={() => onClickKey(Keys.NUM_1.id)}>
                    <ButtonAsset id={Keys.NUM_1.id} />
                </Button>
                <Button onPress={() => onClickKey(Keys.NUM_2.id)}>
                    <ButtonAsset id={Keys.NUM_2.id} />
                </Button>
                <Button onPress={() => onClickKey(Keys.NUM_3.id)}>
                    <ButtonAsset id={Keys.NUM_3.id} />
                </Button>
                <Button
                    style={{
                        gridColumn: "4",

                        gridRowStart: "3",
                        gridRowEnd: "5",
                    }}
                    onPress={() => onClickKey(Keys.PLUS.id)}
                    tintColor="#F6F6F7"
                >
                    <ButtonAsset id={Keys.PLUS.id} />
                </Button>
                <Button
                    style={{
                        gridColumn: "6",
                    }}
                    onPress={() => onClickKey(Keys.BACKSPACE.id)}
                    tintColor={"#DBDCDD"}
                >
                    <ButtonAsset id={Keys.BACKSPACE.id} />
                </Button>

                <Button onPress={() => onClickKey(Keys.NUM_0.id)}>
                    <ButtonAsset id={Keys.NUM_0.id} />
                </Button>
                <Button onPress={() => onClickKey(Keys.DECIMAL.id)}>
                    <ButtonAsset id={Keys.DECIMAL.id} />
                </Button>
                <Button onPress={() => onClickKey(Keys.NEGATIVE.id)}>
                    <ButtonAsset id={Keys.NEGATIVE.id} />
                </Button>
                <Button
                    style={{
                        gridColumn: "6",
                    }}
                    onPress={() => onClickKey(Keys.DISMISS.id)}
                    tintColor={"#DBDCDD"}
                >
                    <ButtonAsset id={Keys.DISMISS.id} />
                </Button>
            </View>
        );
    }
}
