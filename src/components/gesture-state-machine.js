/**
 * The state machine that backs our gesture system.
 */

class GestureStateMachine {
    constructor(options) {
        this.options = options;
    }

    /**
     * Handle a touch-start event on the node with the given identifer.
     *
     * @param {string} id - the identifier of the node over which the start
     *                      event occurred
     */
    onTouchStart(id) {
        /* eslint-disable no-console */
        console.log("onTouchStart:", id);
    }

    /**
     * Handle a touch-move event on the node with the given identifer.
     *
     * @param {string} id - the identifier of the node over which the move
     *                      event occurred
     */
    onTouchMove(id) {
        /* eslint-disable no-console */
        console.log("onTouchMove:", id);
    }

    /**
     * Handle a touch-end event on the node with the given identifer.
     *
     * @param {string} id - the identifier of the node over which the end
     *                      event occurred
     */
    onTouchEnd(id) {
        /* eslint-disable no-console */
        console.log("onTouchEnd:", id);
    }

    /**
     * Handle a touch-cancel event on the node with the given identifer.
     *
     * @param {string} id - the identifier of the node over which the cancel
     *                      event occurred
     */
    onTouchCancel(id) {
        /* eslint-disable no-console */
        console.log("onTouchEnd:", id);
    }
}

module.exports = GestureStateMachine;
