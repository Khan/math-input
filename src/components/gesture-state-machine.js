/**
 * The state machine that backs our gesture system. In particular, this state
 * machine manages the interplay between focuses, touch ups, and swiping.
 * It is entirely ignorant of the existence of popovers and the positions of
 * DOM nodes, operating solely on IDs.
 */

// TODO(charlie): Substitute in proper constants. These are just for testing.
const longPressWaitTimeMs = 100;
const swipeThresholdPx = 20;

class GestureStateMachine {
    constructor(handlers) {
        this.handlers = handlers;

        this.swiping = false;
        this.startX = null;
    }

    _maybeCancelLongPress() {
        if (this._longPressTimeoutId) {
            clearTimeout(this._longPressTimeoutId);
            this._longPressTimeoutId = null;
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

        // Set the focused node ID and handle the focus event.
        // Note: we can call `onFocus` with `null` IDs. The semantics of an
        // `onFocus` with a `null` ID differs from that of `onBlur`. The former
        // indicates that a gesture that can focus future nodes is still in
        // progress, but that no node is currently focused. The latter
        // indicates that the gesture has ended and nothing will be focused.
        this._focusedNodeId = id;
        this.handlers.onFocus(this._focusedNodeId);

        if (id) {
            const self = this;
            this._longPressTimeoutId = setTimeout(() => {
                self.handlers.onLongPress(id);
                self._longPressTimeoutId = null;
            }, longPressWaitTimeMs);
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

        this._focusedNodeId = null;
        this.handlers.onBlur();
    }

    /**
     * Handle a touch-start event on the node with the given identifer.
     *
     * @param {string} id - the identifier of the node over which the start
     *                      event occurred
     */
    onTouchStart(id, pageX) {
        this.startX = pageX;

        this._onFocus(id);
    }

    /**
     * Handle a touch-move event on the node with the given identifer.
     *
     * @param {string} id - the identifier of the node over which the move
     *                      event occurred
     * @param {number} pageX - the x coordinate of the touch
     * @param {boolean} swipeEnabled - whether the system should allow for
     *                                 transitions into a swiping state
     */
    onTouchMove(id, pageX, swipeEnabled) {
        const dx = pageX - this.startX;
        const shouldBeginSwiping = !this.swiping && swipeEnabled &&
            Math.abs(dx) > swipeThresholdPx;

        if (this.swiping) {
            this.handlers.onSwipeChange(dx);
        } else if (shouldBeginSwiping) {
            this._onBlur();

            // Trigger the swipe.
            this.swiping = true;
            this.handlers.onSwipeChange(dx);
        } else if (id !== this._focusedNodeId) {
            this._onFocus(id);
        }
    }

    /**
     * Handle a touch-end event on the node with the given identifer.
     *
     * @param {string} id - the identifier of the node over which the end
     *                      event occurred
     * @param {number} pageX - the x coordinate of the touch
     */
    onTouchEnd(id, pageX) {
        if (this.swiping) {
            this.handlers.onSwipeEnd(pageX - this.startX);
        } else {
            // Trigger a touch-end. There's no need to notify clients of a blur
            // as clients are responsible for handling any cleanup in their
            // touch-end handlers.
            this.handlers.onTouchEnd(id);

            // Clean-up any lingering long-press events.
            this._maybeCancelLongPress();
            this._focusedNodeId = null;
        }

        this.swiping = false;
        this.startX = null;
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
    }
}

module.exports = GestureStateMachine;
