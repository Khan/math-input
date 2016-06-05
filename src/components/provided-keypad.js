const React = require('react');
const { Provider } = require('react-redux');

const MathKeypad = require('./math-keypad');
const {
    activateKeypad,
    dismissKeypad,
    configureKeypad,
    setCursor,
    setKeyHandler,
} = require('../actions');
const createStore = require('../store');

const ProvidedKeypad = React.createClass({
    propTypes: {
        onElementMounted: React.PropTypes.func,
    },

    componentWillMount() {
        this.store = createStore();
    },

    activate() {
        this.store.dispatch(activateKeypad());
    },

    dismiss() {
        this.store.dispatch(dismissKeypad());
    },

    configure(configuration, cb) {
        this.store.dispatch(configureKeypad(configuration));

        // HACK(charlie): In Perseus, triggering a focus causes the keypad to
        // animate into view and re-configure. We'd like to provide the option
        // to re-render the re-configured keypad before animating it into view,
        // to avoid jank in the animation. As such, we support passing a
        // callback into `configureKeypad`. However, implementing this properly
        // would require middleware, etc., so we just hack it on with
        // `setTimeout` for now.
        setTimeout(() => cb && cb());
    },

    setCursor(cursor) {
        this.store.dispatch(setCursor(cursor));
    },

    setKeyHandler(keyHandler) {
        this.store.dispatch(setKeyHandler(keyHandler));
    },

    render() {
        const { onElementMounted, ...rest } = this.props;

        return <Provider store={this.store}>
            <MathKeypad
                onElementMounted={(element) => {
                    // Append the dispatch methods that we want to expose
                    // externally to the returned React element.
                    const elementWithDispatchMethods = {
                        ...element,
                        activate: this.activate,
                        dismiss: this.dismiss,
                        configure: this.configure,
                        setCursor: this.setCursor,
                        setKeyHandler: this.setKeyHandler,
                    };
                    onElementMounted &&
                        onElementMounted(elementWithDispatchMethods);
                }}
                {...rest}
            />
        </Provider>;
    },
});

module.exports = ProvidedKeypad;
