import React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import Button from "./button";

type Props = {};
type State = {};
export default class NumericInputPage extends React.Component<Props, State> {
    render() {
        return (
            <View
                style={{
                    backgroundColor: "#DBDCDD",
                    width: 283,
                    height: 192,

                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gridTemplateRows: "repeat(4, 1fr)",
                }}
            >
                <Button>7</Button>
                <Button>8</Button>
                <Button>9</Button>
                <Button>x</Button>
                <Button>(</Button>
                <Button>)</Button>

                <Button>4</Button>
                <Button>5</Button>
                <Button>6</Button>
                <Button>-</Button>
                <Button
                    style={{
                        gridColumn: "5 / 7",
                    }}
                >
                    frac
                </Button>

                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button
                    style={{
                        gridColumn: "4",

                        gridRowStart: "3",
                        gridRowEnd: "5",
                    }}
                >
                    +
                </Button>
                <Button
                    style={{
                        gridColumn: "6",
                    }}
                >
                    del
                </Button>

                <Button>0</Button>
                <Button>.</Button>
                <Button>(-)</Button>
                <Button
                    style={{
                        gridColumn: "6",
                    }}
                >
                    v
                </Button>
            </View>
        );
    }
}
