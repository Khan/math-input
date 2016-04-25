/**
 * A keypad that includes a subset of the expression symbols.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const SimpleKeypadButton = require('./simple-keypad-button');
const EmptyKeypadButton = require('./empty-keypad-button');
const MultiKeypadButton = require('./multi-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const { keypad, row } = require('./styles');

const { keyPropType } = require('./prop-types');
const ButtonProps = require('./button-props');

const BasicExpressionKeypad = React.createClass({
    propTypes: {
        extraKeys: React.PropTypes.arrayOf(keyPropType),
        page: React.PropTypes.number.isRequired,
    },

    render() {
        const { extraKeys, page } = this.props;

        let keypadContents;
        switch (page) {
            case 0:
                keypadContents = [
                    <View style={row}>
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_7} />
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_8} />
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_9} />
                        <MultiKeypadButton
                            primaryKey={ButtonProps.FRAC}
                            secondaryKeys={[ButtonProps.DIVIDE]}
                        />
                        <SimpleKeypadButton singleKey={ButtonProps.MORE} />
                    </View>,
                    <View style={row}>
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_4} />
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_5} />
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_6} />
                        <MultiKeypadButton
                            primaryKey={ButtonProps.PARENS}
                            secondaryKeys={[
                                ButtonProps.CDOT,
                                ButtonProps.TIMES,
                            ]}
                        />
                        <SimpleKeypadButton singleKey={ButtonProps.RIGHT} />
                    </View>,
                    <View style={row}>
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_1} />
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_2} />
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_3} />
                        <SimpleKeypadButton singleKey={ButtonProps.MINUS} />
                        <SimpleKeypadButton
                            singleKey={ButtonProps.BACKSPACE}
                        />
                    </View>,
                    <View style={row}>
                        <ManyKeypadButton keys={extraKeys} />
                        <SimpleKeypadButton singleKey={ButtonProps.NUM_0} />
                        <SimpleKeypadButton singleKey={ButtonProps.DECIMAL} />
                        <SimpleKeypadButton singleKey={ButtonProps.PLUS} />
                        <SimpleKeypadButton singleKey={ButtonProps.DISMISS} />
                    </View>,
                ];
                break;

            case 1:
                keypadContents = [
                    <View style={row}>
                        <MultiKeypadButton
                            primaryKey={ButtonProps.EQUAL}
                            secondaryKeys={[ButtonProps.NEQ]}
                            showAllSymbols={false}
                        />
                        <MultiKeypadButton
                            primaryKey={ButtonProps.EXP_2}
                            secondaryKeys={[ButtonProps.EXP]}
                            showAllSymbols={false}
                        />
                        <SimpleKeypadButton singleKey={ButtonProps.NUMBERS} />
                    </View>,
                    <View style={row}>
                        <MultiKeypadButton
                            primaryKey={ButtonProps.LT}
                            secondaryKeys={[ButtonProps.LEQ]}
                            showAllSymbols={false}
                        />
                        <MultiKeypadButton
                            primaryKey={ButtonProps.SQRT}
                            secondaryKeys={[ButtonProps.RADICAL]}
                            showAllSymbols={false}
                        />
                        <SimpleKeypadButton singleKey={ButtonProps.RIGHT} />
                    </View>,
                    <View style={row}>
                        <MultiKeypadButton
                            primaryKey={ButtonProps.GT}
                            secondaryKeys={[ButtonProps.GEQ]}
                            showAllSymbols={false}
                        />
                        <EmptyKeypadButton />
                        <SimpleKeypadButton
                            singleKey={ButtonProps.BACKSPACE}
                        />
                    </View>,
                    <View style={row}>
                        <EmptyKeypadButton />
                        <EmptyKeypadButton />
                        <SimpleKeypadButton singleKey={ButtonProps.DISMISS} />
                    </View>,
                ];
                break;

            default:
                throw new Error(
                    "Invalid page index for keypad: " + this.props.page);
        }

        return <View style={keypad}>
            {keypadContents}
        </View>;
    },
});

module.exports = BasicExpressionKeypad;
