const queryString = require('query-string');
const {
    KeypadTypes,
    SwitchTypes,
    EchoAnimationTypes,
    JumpOutTypes,
    DebugSwitcherTypes,
} = require('./consts');

// test 1
// keypad_switch: [toggle], page_control, tab_bar

// tests 2 & 3 & 4
// keypad_type: number, fraction, simple_expression, [advanced_expression]
// TODO(kevinb) map these to existing keypad constants

// echo_state: [yes], no

// icon_style: simple, [fancy]

// test 5
// jump_out: static, dynamic

const search = typeof location === 'undefined' ? '' : location.search;
const parsed = queryString.parse(search);

const containsConfigurationOptions = Object.keys(parsed).length > 0;

const defaults = {
    keypadSwitch: SwitchTypes.TOGGLE,
    keypadType: KeypadTypes.ADVANCED_EXPRESSION,
    jumpOutType: JumpOutTypes.STATIC,
    echoAnimation: EchoAnimationTypes.SLIDE_AND_FADE,
    iconStyle: 'fancy',
    debugSwitcher: containsConfigurationOptions ?
                   DebugSwitcherTypes.DISABLED :
                   DebugSwitcherTypes.ENABLED,
};

const settings = {
    keypadSwitch: parsed.keypad_switch || defaults.keypadSwitch,
    keypadType: parsed.keypad_type || defaults.keypadType,
    jumpOutType: parsed.jump_out_type || defaults.jumpOutType,
    echoAnimation: parsed.echo_animation || defaults.echoAnimation,
    iconStyle: parsed.icon_style || defaults.iconStyle,
    debugSwitcher: parsed.debug_switcher || defaults.debugSwitcher,
};

// Map any values to caps.
for (const [key, value] of Object.entries(settings)) {
    settings[key] = value.toUpperCase();
}

module.exports = settings;
