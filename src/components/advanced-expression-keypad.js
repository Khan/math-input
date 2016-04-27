/**
 * A keypad that includes all of the advanced expression symbols.
 */

const React = require('react');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const SimpleKeypadButton = require('./simple-keypad-button');
const EmptyKeypadButton = require('./empty-keypad-button');
const MultiKeypadButton = require('./multi-keypad-button');
const ManyKeypadButton = require('./many-keypad-button');
const { row, column, oneColumn, fullWidth } = require('./styles');

const { keyPropType } = require('./prop-types');
const ButtonProps = require('./button-props');

const AdvancedExpressionKeypad = React.createClass({
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
                    customSymbolWithName={'FRAC_MULTI'}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.PARENS}
                    secondaryKeys={[
                        ButtonProps.CDOT,
                        ButtonProps.TIMES,
                    ]}
                    customSymbolWithName={'PARENS_MULTI'}
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
            <View style={[column, styles.largeColumn]}>
                <MultiKeypadButton
                    primaryKey={ButtonProps.EQUAL}
                    secondaryKeys={[ButtonProps.NEQ]}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.LT}
                    secondaryKeys={[ButtonProps.LEQ]}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.GT}
                    secondaryKeys={[ButtonProps.GEQ]}
                />
                <EmptyKeypadButton />
            </View>
            <View style={[column, styles.largeColumn]}>
                <MultiKeypadButton
                    primaryKey={ButtonProps.EXP_2}
                    secondaryKeys={[ButtonProps.EXP_3, ButtonProps.EXP]}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.SQRT}
                    secondaryKeys={[
                        ButtonProps.CUBE_ROOT,
                        ButtonProps.RADICAL,
                    ]}
                />
                <MultiKeypadButton
                    primaryKey={ButtonProps.LOG}
                    secondaryKeys={[ButtonProps.LN, ButtonProps.LOG_N]}
                />
                <EmptyKeypadButton />
            </View>
            <View style={[column, styles.largeColumn]}>
                <SimpleKeypadButton singleKey={ButtonProps.SIN} />
                <SimpleKeypadButton singleKey={ButtonProps.COS} />
                <SimpleKeypadButton singleKey={ButtonProps.TAN} />
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

// On the second page, we want the rightmost column to retain its width from
// the first page (which uses a 5-column layout), and the other three columns
// to equally share the remaining 4/5 of the page. That means the rightmost
// column will have a flexGrow factor of 1, and the remaining three columns
// will share a space 4 times as large. Thus, they each have a flexGrow of 4/3.
const styles = StyleSheet.create({
    largeColumn: {
        flexGrow: 4 / 3,
    },
});

module.exports = AdvancedExpressionKeypad;
