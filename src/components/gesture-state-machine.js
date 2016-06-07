/**
 * The state machine that backs our gesture system. In particular, this state
 * machine manages the interplay between focuses, touch ups, and swiping.
 * It is entirely ignorant of the existence of popovers and the positions of
 * DOM nodes, operating solely on IDs.
 */

// TODO(charlie): Substitute in proper constants. These are just for testing.
const longPressWaitTimeMs = 100;
const swipeThresholdPx = 20;
const { holdInterval } = require('../settings');

class GestureStateMachine {
    constructor(handlers, swipeDisabledNodeIds, multiPressableKeys) {
        this.handlers = handlers;
        this.swipeDisabledNodeIds = swipeDisabledNodeIds;
        this.multiPressableKeys = multiPressableKeys;

        this.swiping = false;
        this.startX = null;
        this._swipeDisabledForGesture = false;
    }

    _maybeCancelLongPress() {
        if (this._longPressTimeoutId) {
            clearTimeout(this._longPressTimeoutId);
            this._longPressTimeoutId = null;
        }
    }

    _maybeCancelPressAndHold() {
        if (this._pressAndHoldIntervalId) {
            // If there was an interval set to detect holds, clear it out.
            clearInterval(this._pressAndHoldIntervalId);
            this._pressAndHoldIntervalId = null;
        }
    }

    /**
     * Handle a focus event on the node with the given identifier, which may be
     * `null` to indicate that the user has dragged their finger off of any
     * registered nodes, but is still in the middle of a gesture.
     *
     * @param {string|null} id - the identifier of the newly focused node, or
     *                           `null` if no node is focused
     */
    _onFocus(id) {
        // If we're in the middle of a long-press, cancel it.
        this._maybeCancelLongPress();

        // Reset any existing hold-detecting interval.
        this._maybeCancelPressAndHold();

        // Set the focused node ID and handle the focus event.
        // Note: we can call `onFocus` with `null` IDs. The semantics of an
        // `onFocus` with a `null` ID differs from that of `onBlur`. The former
        // indicates that a gesture that can focus future nodes is still in
        // progress, but that no node is currently focused. The latter
        // indicates that the gesture has ended and nothing will be focused.
        this._focusedNodeId = id;
        this.handlers.onFocus(this._focusedNodeId);

        if (id) {
            // Handle logic for repeating button presses.
            if (this.multiPressableKeys.includes(id)) {
                // Start by triggering a click, iOS style.
                this.handlers.onTrigger(id);

                // Set up a new hold detector for the current button.
                this._pressAndHoldIntervalId = setInterval(() => {
                    // On every cycle, trigger the click handler.
                    this.handlers.onTrigger(id);
                }, holdInterval);
            } else {
                const self = this;
                this._longPressTimeoutId = setTimeout(() => {
                    self.handlers.onLongPress(id);
                    self._longPressTimeoutId = null;
                }, longPressWaitTimeMs);
            }
        }
    }

    /**
     * Handle a blur event, indicating the end of a gesture's focusable
     * lifetime. After a blur, nothing will be focused until a new gesture
     * begins, although the system may continue to generate swipe events.
     */
    _onBlur() {
        // If we're in the middle of a long-press, cancel it.
        this._maybeCancelLongPress();

        this._maybeCancelPressAndHold();

        this._focusedNodeId = null;
        this.handlers.onBlur();
    }

    /**
     * A function that returns the identifier of the node over which the touch
     * event occurred. This is provided as a piece of lazy computation, as
     * computing the DOM node for a given point is expensive, and the state
     * machine won't always need that information. For example, if the user is
     * swiping, then `onTouchMove` needs to be performant and doesn't care about
     * the node over which the touch occurred.
     *
     * @typedef idComputation
     * @returns {DOMNode} - the identifier of the node over which the touch
     *                      occurred
     */

    /**
     * Handle a touch-start event on the node with the given identifer.
     *
     * @param {idComputation} getId - a function that returns identifier of the
     *                                node over which the start event occurred
     */
    onTouchStart(getId, pageX) {
        this.startX = pageX;
        const startingNode = getId();

        this._swipeDisabledForGesture =
            this.swipeDisabledNodeIds.includes(startingNode);

        this._onFocus(startingNode);
    }

    /**
     * Handle a touch-move event on the node with the given identifer.
     *
     * @param {idComputation} getId - a function that returns identifier of the
     *                                node over which the move event occurred
     * @param {number} pageX - the x coordinate of the touch
     * @param {boolean} swipeEnabled - whether the system should allow for
     *                                 transitions into a swiping state
     */
    onTouchMove(getId, pageX, swipeEnabled) {
        const dx = pageX - this.startX;
        const shouldBeginSwiping = !this.swiping && swipeEnabled &&
            Math.abs(dx) > swipeThresholdPx && !this._swipeDisabledForGesture;

        if (this.swiping) {
            this.handlers.onSwipeChange(dx);
        } else if (shouldBeginSwiping) {
            this._onBlur();

            // Trigger the swipe.
            this.swiping = true;
            this.handlers.onSwipeChange(dx);
        } else {
            const id = getId();
            if (id !== this._focusedNodeId) {
                this._onFocus(id);
            }
        }
    }

    /**
     * Handle a touch-end event on the node with the given identifer.
     *
     * @param {idComputation} getId - a function that returns identifier of the
     *                                node over which the end event occurred
     * @param {number} pageX - the x coordinate of the touch
     */
    onTouchEnd(getId, pageX) {
        if (this.swiping) {
            this.handlers.onSwipeEnd(pageX - this.startX);
        } else if (this._pressAndHoldIntervalId) {
            // We don't trigger a touch end if there was a press and hold,
            // because the key has been triggered at least once and calling the
            // onTouchEnd handler would add an extra trigger.
            this._onBlur();
        } else {
            // Trigger a touch-end. There's no need to notify clients of a blur
            // as clients are responsible for handling any cleanup in their
            // touch-end handlers.
            // NOTE(charlie): To avoid unnecessary lookups, we can just use the
            // focused node ID that we've been tracking internally, unless the
            // node received a long press, in which case, it may not be the
            // focused node even though we never moved off of it.
            let id;
            if (this._longPressTimeoutId) {
                id = this._focusedNodeId;
            } else {
                id = getId();
            }

            this.handlers.onTouchEnd(id);

            // Clean-up any lingering long-press events.
            this._maybeCancelLongPress();
            this._focusedNodeId = null;
        }

        this.swiping = false;
        this.startX = null;
        this._swipeDisabledForGesture = false;
    }

    /**
     * Handle a touch-cancel event.
     */
    onTouchCancel() {
        // If a touch is cancelled and we're swiping, end the swipe with no
        // displacement.
        if (this.swiping) {
            this.handlers.onSwipeEnd(0);
        } else {
            // Otherwise, trigger a full blur. We don't want to trigger a
            // touch-up, since the cancellation means that the user probably
            // didn't release over a key intentionally.
            this._onBlur();
        }

        this.swiping = false;
        this.startX = null;
        this._swipeDisabledForGesture = false;
    }
}

module.exports = GestureStateMachine;
