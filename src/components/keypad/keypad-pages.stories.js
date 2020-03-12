//@flow

import React from "react";
import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";

import {withKnobs, number} from "@storybook/addon-knobs";

import NumericInputPage from "./numeric-input-page";
import PrealgebraInputPage from "./pre-algebra-page";

export default {
    title: "Keypad pages",
    decorators: [withKnobs],
    parameters: {
        backgrounds: [
            {name: "light background", value: "white", default: true},
        ],
    },
};

export const NumericInput = () => (
    <View
        style={{
            width: number("width", 320),
        }}
    >
        <NumericInputPage onClickKey={action("onClickKey")} />
    </View>
);

export const PreAlgebraInput = () => (
    <View
        style={{
            width: number("width", 320),
        }}
    >
        <PrealgebraInputPage onClickKey={action("onClickKey")} />
    </View>
);
