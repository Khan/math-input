// @flow

import React from "react";

import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import Button from "./button";
import Keys from "../../data/key-configs";
import ButtonAsset from "./button-assets";
import KeypadPageContainer from "./keypad-page-container";

import type {KeyConfig} from "../../data/key-configs";

type Props = {
    onClickKey: (keyConfig: string) => void,
};
type State = {};

const KeypadButton = ({
    keyConfig,
    onClickKey,
    tintColor,
    style,
}: {
    keyConfig: KeyConfig,
    tintColor?: string,
    style?: any,
    onClickKey: (keyConfig: string) => void,
}) => (
    <Button
        onPress={() => onClickKey(keyConfig.id)}
        tintColor={tintColor}
        style={style}
    >
        <ButtonAsset id={keyConfig.id} />
    </Button>
);

const SecondaryKeypadButton = ({
    keyConfig,
    onClickKey,
    style,
}: {
    keyConfig: KeyConfig,
    style?: any,
    onClickKey: (keyConfig: string) => void,
}) => (
    <KeypadButton
        keyConfig={keyConfig}
        onClickKey={onClickKey}
        style={style}
        tintColor={"#F6F6F7"}
    />
);

const KeypadActionButton = ({
    keyConfig,
    onClickKey,
    style,
}: {
    keyConfig: KeyConfig,
    style?: any,
    onClickKey: (keyConfig: string) => void,
}) => (
    <KeypadButton
        keyConfig={keyConfig}
        onClickKey={onClickKey}
        style={style}
        tintColor={"#DBDCDD"}
    />
);

export default class NumericInputPage extends React.Component<Props, State> {
    render() {
        const {onClickKey} = this.props;
        return (
            <KeypadPageContainer>
                {/* Row 1 */}
                <KeypadButton keyConfig={Keys.NUM_7} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_8} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_9} onClickKey={onClickKey} />
                <SecondaryKeypadButton
                    keyConfig={Keys.TIMES}
                    onClickKey={onClickKey}
                />
                <SecondaryKeypadButton
                    keyConfig={Keys.LEFT_PAREN}
                    onClickKey={onClickKey}
                />
                <SecondaryKeypadButton
                    keyConfig={Keys.RIGHT_PAREN}
                    onClickKey={onClickKey}
                />

                {/* Row 2 */}
                <KeypadButton keyConfig={Keys.NUM_4} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_5} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_6} onClickKey={onClickKey} />

                <SecondaryKeypadButton
                    keyConfig={Keys.MINUS}
                    onClickKey={onClickKey}
                />

                <SecondaryKeypadButton
                    keyConfig={Keys.FRAC_INCLUSIVE}
                    onClickKey={onClickKey}
                    style={{
                        gridColumn: "5 / 7",
                    }}
                />
                {/* Row 3 */}
                <KeypadButton keyConfig={Keys.NUM_1} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_2} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_3} onClickKey={onClickKey} />

                <SecondaryKeypadButton
                    keyConfig={Keys.PLUS}
                    style={{
                        gridColumn: "4",
                        gridRowStart: "3",
                        gridRowEnd: "5",
                    }}
                    onClickKey={onClickKey}
                />

                <KeypadActionButton
                    keyConfig={Keys.BACKSPACE}
                    style={{
                        gridColumn: "6",
                    }}
                    onClickKey={onClickKey}
                />

                {/* Row 4 */}
                <KeypadButton keyConfig={Keys.NUM_0} onClickKey={onClickKey} />
                <KeypadButton
                    keyConfig={Keys.DECIMAL}
                    onClickKey={onClickKey}
                />
                <KeypadButton
                    keyConfig={Keys.NEGATIVE}
                    onClickKey={onClickKey}
                />

                <KeypadActionButton
                    keyConfig={Keys.DISMISS}
                    style={{
                        gridColumn: "6",
                    }}
                    onClickKey={onClickKey}
                />
            </KeypadPageContainer>
        );
    }
}
