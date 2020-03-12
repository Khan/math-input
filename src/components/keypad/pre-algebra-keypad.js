//@flow
import React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Clickable from "@khanacademy/wonder-blocks-clickable";

import {Tabbar} from "../tabbar/tabbar";
import NumericInputPage from "./numeric-input-page";
import PreAlgebraPage from "./pre-algebra-page";

import type {Node} from "React";
import type {TabbarItemType} from "../tabbar/item";

type Props = {
    onClickKey: (keyConfig: string) => void,
};
type State = {
    selectedPage: TabbarItemType,
};

export default class PreAlgebraKeypad extends React.Component<Props, State> {
    state = {
        selectedPage: "Numbers",
    };
    render() {
        const {selectedPage} = this.state;
        const {onClickKey} = this.props;
        return (
            <View>
                <Tabbar
                    items={["Numbers", "Operators"]}
                    onSelect={(tabbarItem: TabbarItemType) => {
                        this.setState({selectedPage: tabbarItem});
                    }}
                />
                {selectedPage === "Numbers" && (
                    <NumericInputPage onClickKey={onClickKey} />
                )}
                {selectedPage === "Operators" && (
                    <PreAlgebraPage onClickKey={onClickKey} />
                )}
            </View>
        );
    }
}
