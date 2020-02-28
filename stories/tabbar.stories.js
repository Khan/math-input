import React from "react";
import {action} from "@storybook/addon-actions";

import {TabbarItem} from "../src/components/tabbar";
import {Button} from "@storybook/react/demo";

export default {title: "Tab Bar"};

export const InactiveBarItem = () => (
    <TabbarItem
        itemState="inactive"
        onPress={() => {
            alert("activated");
        }}
    />
);
export const ActiveBarItem = () => <TabbarItem itemState="active" />;
export const DisabledBarItem = () => <TabbarItem itemState="disabled" />;
