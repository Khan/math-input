/**
 * The state machine that backs our gesture system. In particular, this state
 * machine manages the interplay between focuses, touch ups, and swiping.
 * It is entirely ignorant of the existence of popovers and the positions of
 * DOM nodes, operating solely on IDs.
 */

// TODO(charlie): Substitute in proper constants. These are just for testing.
const waitTimeMs = 200;
const swipeThreshold = 20;

class GestureStateMachine {
    constructor(handlers) {
        this.handlers = handlers;

        this.swiping = false;
        this.startX = null;
    }

    /**
     * Handle a touch-start event on the node with the given identifer.
     *
     * @param {string} id - the identifier of the node over which the start
     *                      event occurred
     */
    onTouchStart(id, pageX) {
        this.startX = pageX;

        const self = this;
        this._focusTimeoutId = setTimeout(() => {
            self.handlers.onFocus(id);
            self._focusTimeoutId = null;
        }, waitTimeMs);
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
            Math.abs(dx) > swipeThreshold;

        if (this.swiping) {
            this.handlers.onSwipeChange(dx);
        } else if (shouldBeginSwiping) {
            // Cancel the focus event.
            clearTimeout(this._focusTimeoutId);
            this._focusTimeoutId = null;

            // Trigger the swipe.
            this.swiping = true;
            this.handlers.onSwipeChange(dx);

            this.handlers.onBlur();
        } else if (this._focusTimeoutId) {
            // Waiting to see if we're swiping.
            // TODO(charlie): If we've moved over onto another node, what
            // should we do?
        } else if (id != null) {
            // Handle the move by changing focus, if you're over a node.
            this.handlers.onFocus(id);
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
            this.handlers.onTouchEnd(id);
        }

        // Cancel the focus event.
        clearTimeout(this._focusTimeoutId);
        this._focusTimeoutId = null;

        this.swiping = false;
        this.startX = null;
    }

    /**
     * Handle a touch-cancel event.
     */
    onTouchCancel() {
        this.handlers.onBlur();

        // Cancel the focus event.
        clearTimeout(this._focusTimeoutId);
        this._focusTimeoutId = null;

        this.swiping = false;
        this.startX = null;
    }
}

module.exports = GestureStateMachine;
