/**
 * The state machine that backs our gesture system.
 */

// TODO(charlie): Substitute in proper constants. These are just for testing.
const waitTimeMs = 200;
const swipeThreshold = 20;

class GestureStateMachine {
    constructor(options) {
        this.options = options;

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
            self.options.onFocus(id);
            self._focusTimeoutId = null;
        }, waitTimeMs);
    }

    /**
     * Handle a touch-move event on the node with the given identifer.
     *
     * @param {string} id - the identifier of the node over which the move
     *                      event occurred
     * @param {number} pageX - the x coordinate of the touch
     */
    onTouchMove(id, pageX) {
        const dx = pageX - this.startX;
        const shouldBeginSwiping = !this.swiping &&
            Math.abs(dx) > swipeThreshold;

        if (this.swiping) {
            this.options.onSwipeChange(dx);
        } else if (shouldBeginSwiping) {
            // Cancel the focus event.
            clearTimeout(this._focusTimeoutId);
            this._focusTimeoutId = null;

            // Trigger the swipe.
            this.swiping = true;
            this.options.onSwipeChange(dx);

            this.options.onBlur();
        } else if (this._focusTimeoutId) {
            // Waiting to see if we're swiping.
            // TODO(charlie): If we've moved over onto another node, what
            // should we do?
        } else if (id != null) {
            // Handle the move by changing focus, if you're over a node.
            this.options.onFocus(id);
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
            this.options.onSwipeEnd(pageX - this.startX);
        } else {
            this.options.onTouchEnd(id);
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
        this.options.onBlur();

        // Cancel the focus event.
        clearTimeout(this._focusTimeoutId);
        this._focusTimeoutId = null;

        this.swiping = false;
        this.startX = null;
    }
}

module.exports = GestureStateMachine;
