import React from "react";
import {action} from "@storybook/addon-actions";

import {Tabbar, TabbarItem} from "../src/components/tabbar";
import {Button} from "@storybook/react/demo";

export default {title: "Tab Bar"};

export const InactiveBarItem = () => (
    <TabbarItem
        itemState="inactive"
        itemType="Geometry"
        onPress={() => {
            alert("activated");
        }}
    />
);
export const ActiveBarItem = () => (
    <TabbarItem itemType="Geometry" itemState="active" />
);
export const DisabledBarItem = () => (
    <TabbarItem itemType="Geometry" itemState="disabled" />
);

export const FullTabbar = () => <Tabbar></Tabbar>;
