// @flow
import React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

const KeypadPageContainer = ({children}: {children: any}) => (
    <View
        style={{
            backgroundColor: "#DBDCDD",
            width: "100%",
            height: 192,

            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
        }}
    >
        {children}
    </View>
);

module.exports = KeypadPageContainer;
