/* eslint no-console: 0 */

const React = require('react');
const ReactDOM = require('react-dom');
const { StyleSheet } = require("aphrodite");

const actions = require('../actions');
const { View, Text } = require('../fake-react-native-web');
const CursorHandle = require('./cursor-handle');
const MathWrapper = require('../../test/test-math-wrapper');

const MathInput = React.createClass({
    getInitialState() {
        return {
            handle: {
                visible: false,
                x: 0,
                y: 0,
            },
        };
    },

    componentDidMount() {
        this.mathField = new MathWrapper(this._text);

        // pass this component's handleKey method to the store so it can call
        // it whenever the store gets an KeyPress action from the keypad
        actions.registerKeyHandler(key => {
            this.mathField.pressKey(key);

            // Hide the cursor handle whenever the user types a key.
            this.setState({ handle: { visible: false } });
        });
    },

    _setCursorLocation(x, y) {
        this.mathField.setCursorPosition(x, y);

        const containerBounds = this._container.getBoundingClientRect();
        const cursorBounds =
            document.querySelector('.mq-cursor').getBoundingClientRect();

        // Subtract the upper left corner of the container bounds from the
        // coordinates of the cursor to account for the fact that the
        // container is position:relative while the cursor handle will be
        // position:absolute.
        const left = cursorBounds.left - containerBounds.left;
        const bottom = cursorBounds.bottom - containerBounds.top;

        this.setState({
            handle: {
                visible: true,
                x: left,
                y: bottom,
            },
        });
    },

    handleClick(e) {
        this._setCursorLocation(e.pageX, e.pageY);
    },

    handleTouchStart(e) {
        e.preventDefault();

        const touch = e.changedTouches[0];
        this._setCursorLocation(touch.pageX, touch.pageY);
    },

    handleHandleMove(x, y) {
        const containerBounds = this._container.getBoundingClientRect();

        // Use the middle of the container as our y-coordinate because the
        // finger that's dragging the handle is below the container.
        // TODO(kevinb) figure out how deal with fractions and exponents
        const middle = (containerBounds.top + containerBounds.bottom) / 2;

        this._setCursorLocation(x, middle);
    },

    render() {
        return <View
            ref={(node) => this._container = ReactDOM.findDOMNode(node)}
            style={styles.input}
            onClick={this.handleClick}
            onTouchStart={this.handleTouchStart}
        >
            <Text ref={(node) => this._text = ReactDOM.findDOMNode(node)} />
            <CursorHandle
                {...this.state.handle}
                onMove={this.handleHandleMove}
            />
        </View>;
    },
});

const styles = StyleSheet.create({
    input: {
        margin: 10,
        width: 300,
        fontSize: 28,
    },
});

module.exports = MathInput;
