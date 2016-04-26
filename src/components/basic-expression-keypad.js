/**
 * A keypad that includes a subset of the expression symbols.
 */

const React = require('react');

const { View } = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const SimpleKeypadButton = require('./simple-keypad-button');
const EmptyKeypadButton = require('./empty-keypad-button');
const MultiKeypadButton = require('./multi-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const { row, column, oneColumn, twoColumn, fullWidth } = require('./styles');

const { keyPropType } = require('./prop-types');
const ButtonProps = require('./button-props');

const BasicExpressionKeypad = React.createClass({
    propTypes: {
        extraKeys: React.PropTypes.arrayOf(keyPropType),
        page: React.PropTypes.number.isRequired,
    },

    render() {
        const { extraKeys } = this.props;

        const firstPage = <View style={[row, fullWidth]}>
            <View style={[column, oneColumn]}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_7} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_4} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_1} />
                <ManyKeypadButton keys={extraKeys} />
            </View>
            <View style={[column, oneColumn]}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_8} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_5} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_2} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_0} />
            </View>
            <View style={[column, oneColumn]}>
                <SimpleKeypadButton singleKey={ButtonProps.NUM_9} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_6} />
                <SimpleKeypadButton singleKey={ButtonProps.NUM_3} />
                <SimpleKeypadButton singleKey={ButtonProps.DECIMAL} />
            </View>
            <View style={[column, oneColumn]}>
                <MultiKeypadButton
                    primaryKey={ButtonProps.FRAC}
                    secondaryKeys={[ButtonProps.DIVIDE]}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.PARENS}
                    secondaryKeys={[
                        ButtonProps.CDOT,
                        ButtonProps.TIMES,
                    ]}
                />
                <SimpleKeypadButton singleKey={ButtonProps.MINUS} />
                <SimpleKeypadButton singleKey={ButtonProps.PLUS} />
            </View>
            <View style={[column, oneColumn]}>
                <SimpleKeypadButton singleKey={ButtonProps.MORE} />
                <SimpleKeypadButton singleKey={ButtonProps.RIGHT} />
                <SimpleKeypadButton singleKey={ButtonProps.BACKSPACE} />
                <SimpleKeypadButton singleKey={ButtonProps.DISMISS} />
            </View>
        </View>;

        const secondPage = <View style={[row, fullWidth]}>
            <View style={[column, twoColumn]}>
                <MultiKeypadButton
                    primaryKey={ButtonProps.EQUAL}
                    secondaryKeys={[ButtonProps.NEQ]}
                    showAllSymbols={false}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.LT}
                    secondaryKeys={[ButtonProps.LEQ]}
                    showAllSymbols={false}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.GT}
                    secondaryKeys={[ButtonProps.GEQ]}
                    showAllSymbols={false}
                />
                <EmptyKeypadButton />
            </View>
            <View style={[column, twoColumn]}>
                <MultiKeypadButton
                    primaryKey={ButtonProps.EXP_2}
                    secondaryKeys={[ButtonProps.EXP]}
                    showAllSymbols={false}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.SQRT}
                    secondaryKeys={[ButtonProps.RADICAL]}
                    showAllSymbols={false}
                />
                <EmptyKeypadButton />
                <EmptyKeypadButton />
            </View>
            <View style={[column, oneColumn]}>
                <SimpleKeypadButton singleKey={ButtonProps.NUMBERS} />
                <SimpleKeypadButton singleKey={ButtonProps.RIGHT} />
                <SimpleKeypadButton singleKey={ButtonProps.BACKSPACE} />
                <SimpleKeypadButton singleKey={ButtonProps.DISMISS} />
            </View>
        </View>;

        return <TwoPageKeypad
            firstPage={firstPage}
            secondPage={secondPage}
            page={this.props.page}
        />;
    },
});

module.exports = BasicExpressionKeypad;
