import React from "react";
import assert from "assert";
import {mount} from "enzyme";

import Tabbar from "../src/components/tabbar/tabbar";
import {TabbarItem} from "../src/components/tabbar/item";
describe("<Tabbar />", () => {
    it("defaults to selecting the first item", () => {
        const wrapper = mount(
            <Tabbar
                items={["Numbers", "Geometry", "Operators"]}
                onSelect={() => {}}
            />,
        );
        expect(wrapper).toHaveState("selectedItem", 0);

        const firstItem = wrapper.childAt(0);

        console.log(firstItem);
        expect(firstItem).toHaveProp("itemState", "active");
    });
    it("selects the second item", () => {
        // Render the component
        // Click on the second item
        // Assert the second item is selected
    });
    it("tapping an already selected item doesn't change selection", () => {
        // Render the component
        // tap the first item
        // assert the first item is still selected
    });
});
