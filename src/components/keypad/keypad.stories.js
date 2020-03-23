//@flow

import React from "react";
import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";

import {withKnobs, number} from "@storybook/addon-knobs";

import Keypad from "./";

export default {
    title: "Full Keypad",
    decorators: [withKnobs],
    parameters: {
        backgrounds: [
            {name: "light background", value: "white", default: true},
        ],
    },
};

export const PreAlgebra = () => (
    <View
        style={{
            width: number("width", 320),
        }}
    >
        <Keypad
            onClickKey={action("onClickKey")}
            preAlgebra={true}
            trigonometry={false}
        />
    </View>
);

export const Trigonometry = () => (
    <View
        style={{
            width: number("width", 320),
        }}
    >
        <Keypad
            onClickKey={action("onClickKey")}
            preAlgebra={true}
            trigonometry={true}
        />
    </View>
);
