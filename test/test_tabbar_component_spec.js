import React from "react";
import assert from "assert";
import {shallow} from "enzyme";

import Tabbar from "../src/components/tabbar/tabbar";

describe("<Tabbar />", () => {
    it("defaults to selecting the first item", () => {
        // Render the component
        // Assert the first item is selected
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
