/* eslint-env node, mocha */
require('babel-polyfill');
const assert = require('assert');

const GestureStateMachine = require('../src/components/gesture-state-machine');

const swipeThresholdPx = 5;
const longPressWaitTimeMs = 5;
const holdIntervalMs = 5;

// Generates a set of handlers, to be passed to a GestureStateMachine instance,
// that track any callbacks, along with their arguments, by pushing to the
// provided buffer on call.
const eventTrackers = (buffer) => {
    const handlers = {};
    const callbackNames = [
        'onBlur',
        'onFocus',
        'onTrigger',
        'onTouchEnd',
        'onLongPress',
        'onSwipeChange',
        'onSwipeEnd',
    ];
    callbackNames.forEach(callbackName => {
        handlers[callbackName] = function() {
            buffer.push([callbackName, ...arguments]);
        };
    });
    return handlers;
};

// Arbitrary node IDs (representative of arbitrary keys) to be used in testing.
const NodeIds = {
    first: 'first',
    second: 'second',
    third: 'third',
    swipeDisabled: 'swipeDisabled',
    multiPressable: 'multiPressable',
};

describe('GestureStateMachine', () => {
    let eventBuffer;
    let stateMachine;

    beforeEach(() => {
        eventBuffer = [];
        stateMachine = new GestureStateMachine(eventTrackers(eventBuffer), {
            swipeThresholdPx, longPressWaitTimeMs, holdIntervalMs,
        }, [NodeIds.swipeDisabled], [NodeIds.multiPressable]);
    });

    const assertEvents = (expectedEvents) => {
        assert.deepEqual(eventBuffer, expectedEvents);
    };

    it('should trigger a tap on a simple button', () => {
        // Trigger a touch start, followed immediately by a touch end.
        stateMachine.onTouchStart(() => NodeIds.first, 0);
        stateMachine.onTouchEnd(() => NodeIds.first, 0);

        // Assert that we saw a focus and a touch end, in that order.
        const expectedEvents = [
            ['onFocus', NodeIds.first],
            ['onTouchEnd', NodeIds.first],
        ];
        assertEvents(expectedEvents);
    });

    it('should shift focus to a new button on move', () => {
        // Trigger a touch start on one node before moving over another node and
        // releasing.
        stateMachine.onTouchStart(() => NodeIds.first, 0);
        stateMachine.onTouchMove(() => NodeIds.second, 0);
        stateMachine.onTouchEnd(() => NodeIds.second, 0);

        // Assert that we saw a focus on both nodes.
        const expectedEvents = [
            ['onFocus', NodeIds.first],
            ['onFocus', NodeIds.second],
            ['onTouchEnd', NodeIds.second],
        ];
        assertEvents(expectedEvents);
    });

    it('should trigger a long press on hold', (done) => {
        // Trigger a touch start.
        stateMachine.onTouchStart(() => NodeIds.first, 0);

        // Assert that we see a focus event immediately.
        const initialExpectedEvents = [['onFocus', NodeIds.first]];
        assertEvents(initialExpectedEvents);

        setTimeout(() => {
            const expectedEventsAfterLongPress = [
                ...initialExpectedEvents,
                ['onLongPress', NodeIds.first],
            ];
            assertEvents(expectedEventsAfterLongPress);

            // Finish up the interaction.
            stateMachine.onTouchEnd(() => NodeIds.first, 0);

            // Assert that we still see a touch-end.
            const expectedEventsAfterRelease = [
                ...expectedEventsAfterLongPress,
                ['onTouchEnd', NodeIds.first],
            ];
            assertEvents(expectedEventsAfterRelease);

            done();
        }, longPressWaitTimeMs);
    });

    it('should trigger a multiple presses on hold', (done) => {
        // Trigger a touch start on the multi-pressable node.
        stateMachine.onTouchStart(() => NodeIds.multiPressable, 0);

        // Assert that we see an immediate focus and trigger.
        const initialExpectedEvents = [
            ['onFocus', NodeIds.multiPressable],
            ['onTrigger', NodeIds.multiPressable],
        ];
        assertEvents(initialExpectedEvents);

        setTimeout(() => {
            // Assert that we see an additional trigger after the delay.
            const expectedEventsAfterHold = [
                ...initialExpectedEvents,
                ['onTrigger', NodeIds.multiPressable],
            ];
            assertEvents(expectedEventsAfterHold);

            // Now release, and verify that we see a blur, but no touch-end.
            stateMachine.onTouchEnd(() => NodeIds.multiPressable, 0);
            const expectedEventsAfterRelease = [
                ...expectedEventsAfterHold,
                ['onBlur'],
            ];
            assertEvents(expectedEventsAfterRelease);

            done();
        }, holdIntervalMs);
    });

    it('should transition to a swipe', () => {
        // Trigger a touch start, followed by a move past the swipe threshold.
        const startX = 0;
        const swipeDistancePx = swipeThresholdPx + 1;
        stateMachine.onTouchStart(() => NodeIds.first, startX);
        stateMachine.onTouchMove(
            () => NodeIds.first, startX + swipeDistancePx, true
        );
        stateMachine.onTouchEnd(() => NodeIds.first, startX + swipeDistancePx);

        // Assert that the node is focused and then blurred before transitioning
        // to a swipe.
        const expectedEvents = [
            ['onFocus', NodeIds.first],
            ['onBlur'],
            ['onSwipeChange', swipeDistancePx],
            ['onSwipeEnd', swipeDistancePx],
        ];
        assertEvents(expectedEvents);
    });

    it('should not transition to a swipe when swiping is diabled', () => {
        // Trigger a touch start, followed by a move past the swipe threshold.
        const startX = 0;
        const swipeDistancePx = swipeThresholdPx + 1;
        stateMachine.onTouchStart(() => NodeIds.first, startX);
        stateMachine.onTouchMove(
            () => NodeIds.first, startX + swipeDistancePx, false
        );

        // Assert that the node is focused but never blurred.
        const expectedEvents = [['onFocus', NodeIds.first]];
        assertEvents(expectedEvents);
    });

    it('should not transition to a swipe on drag from a locked key', () => {
        // Trigger a touch start, followed by a move past the swipe threshold.
        const startX = 0;
        const swipeDistancePx = swipeThresholdPx + 1;
        stateMachine.onTouchStart(() => NodeIds.swipeDisabled, startX);
        stateMachine.onTouchMove(
            () => NodeIds.swipeDisabled, startX + swipeDistancePx, true
        );

        // Assert that the node is focused but never blurred.
        const expectedEvents = [['onFocus', NodeIds.swipeDisabled]];
        assertEvents(expectedEvents);
    });
});
