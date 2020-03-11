import React from "react";
import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";

import {withKnobs, number} from "@storybook/addon-knobs";

import NumericInputPage from "./numeric-input-page";

export default {
    title: "Numeric Input page",
    decorators: [withKnobs],
    parameters: {
        backgrounds: [
            {name: "light background", value: "white", default: true},
        ],
    },
};

export const Full = () => (
    <View
        style={{
            width: number("width", 320),
        }}
    >
        <NumericInputPage onClickKey={action("onClickKey")} />
    </View>
);
