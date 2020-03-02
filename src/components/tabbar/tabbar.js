// @flow

import React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import {TabbarItem} from "./item";

import type {TabbarItemType} from "./item";

const styles = StyleSheet.create({
    tabbar: {
        display: "flex",
        flexDirection: "row",
        background: Color.offWhite,
        paddingTop: 2,
        paddingBottom: 2,
        borderTop: `1px solid ${Color.offBlack50}`,
        borderBottom: `1px solid ${Color.offBlack50}`,
    },
});

type TabbarState = {
    selectedItem: number,
};

type TabbarProps = {
    items: Array<TabbarItemType>,
    onSelect: (item: TabbarItemType) => void,
};

export class Tabbar extends React.Component<TabbarProps, TabbarState> {
    state: TabbarState = {
        selectedItem: 0,
    };
    render() {
        const {items, onSelect} = this.props;
        return (
            <View style={styles.tabbar}>
                {items.map((item, index) => (
                    <TabbarItem
                        itemState={
                            index === this.state.selectedItem
                                ? "active"
                                : "inactive"
                        }
                        itemType={item}
                        onPress={() => {
                            this.setState({selectedItem: index});
                            onSelect(item);
                        }}
                    />
                ))}
            </View>
        );
    }
}
