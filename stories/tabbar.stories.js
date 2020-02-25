import React from "react";

import {TabbarItem} from "../src/components/tabbar";
import {Button} from "@storybook/react/demo";

export default {title: "Tab Bar"};

export const InactiveBarItem = () => <TabbarItem itemState="inactive" />;
export const ActiveBarItem = () => <TabbarItem itemState="active" />;
export const DisabledBarItem = () => <TabbarItem itemState="disabled" />;
