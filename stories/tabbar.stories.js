import React from "react";
import {action} from "@storybook/addon-actions";
import {withKnobs, select, array} from "@storybook/addon-knobs";

import {TabbarItem} from "../src/components/tabbar/item";
import Tabbar from "../src/components/tabbar/tabbar";

export default {title: "Tab Bar", decorators: [withKnobs]};

export const FullTabbar = () => (
    <Tabbar
        items={array("items", ["Numbers", "Geometry", "Operators"])}
        onSelect={action("selected-item")}
    />
);
