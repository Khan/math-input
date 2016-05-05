const queryString = require('query-string');

// test 1
// keypad_switch: [toggle], page_control, tab_bar

// tests 2 & 3 & 4
// keypad_type: number, fraction, simple_expression, [advanced_expression]
// TODO(kevinb) map these to existing keypad constants

// echo_state: [yes], no

// icon_style: simple, [fancy]

const parsed = queryString.parse(location.search);

module.exports = {
    keypadSwitch: parsed.keypad_switch || 'toggle',
    keypadType: parsed.keypad_type || 'advanced_expression',
    echoState: parsed.echo_state || 'yes',
    iconStyle: parsed.icon_style || 'fancy',
    debugSwitcher: parsed.debug_switcher || 'no',
};
