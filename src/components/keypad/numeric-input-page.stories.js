import React from "react";
import {action} from "@storybook/addon-actions";
import {withKnobs, select, array} from "@storybook/addon-knobs";

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

export const Full = () => <NumericInputPage />;
