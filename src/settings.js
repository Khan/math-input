const queryString = require('query-string');
const {
    KeypadTypes,
    FractionBehaviorTypes,
    EchoAnimationTypes,
    JumpOutTypes,
    DebugSwitcherTypes,
} = require('./consts');

const search = typeof location === 'undefined' ? '' : location.search;
const parsed = queryString.parse(search);

const containsConfigurationOptions = Object.keys(parsed).length > 0;

const defaults = {
    keypadType: KeypadTypes.EXPRESSION,
    fractionBehavior: FractionBehaviorTypes.INCLUSIVE,
    jumpOutType: JumpOutTypes.STATIC,
    echoAnimation: EchoAnimationTypes.SLIDE_AND_FADE,
    iconStyle: 'fancy',
    debugSwitcher: containsConfigurationOptions ?
                   DebugSwitcherTypes.DISABLED :
                   DebugSwitcherTypes.ENABLED,
    holdIntervalMs: 250,
};

const settings = {
    keypadType: parsed.keypad_type || defaults.keypadType,
    jumpOutType: parsed.jump_out_type || defaults.jumpOutType,
    fractionBehavior: parsed.fraction_behavior || defaults.fractionBehavior,
    echoAnimation: parsed.echo_animation || defaults.echoAnimation,
    iconStyle: parsed.icon_style || defaults.iconStyle,
    debugSwitcher: parsed.debug_switcher || defaults.debugSwitcher,
    holdIntervalMs:
        parseInt(parsed.hold_interval_ms) || defaults.holdIntervalMs,
};

// Map any values to caps.
for (const [key, value] of Object.entries(settings)) {
    if (typeof value !== "number") {
        settings[key] = value.toUpperCase();
    }
}

module.exports = settings;
