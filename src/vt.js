/**
 * A single entry-point for all of the external-facing functionality.
 */

import "../less/echo.less";
import "../less/main.less";
import "../less/overrides.less";
import "../less/popover.less";

import "mathquill/build/mathquill.css";

import Keypad from "./components/provided-keypad";
import KeypadInput from "./components/input/math-input";

const components = {Keypad, KeypadInput};

const consts = require("./consts");

import {
    keypadConfigurationPropType,
    keypadElementPropType,
} from "./components/prop-types";
const propTypes = {keypadConfigurationPropType, keypadElementPropType};

module.exports = {
    components,
    consts,
    propTypes,
};
