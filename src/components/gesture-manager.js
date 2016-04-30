/**
 * A high-level manager for our gesture system.
 */

const NodeManager = require('./node-manager');
const GestureStateMachine = require('./gesture-state-machine');

const coordsForEvent = (evt) => {
    return [evt.changedTouches[0].pageX, evt.changedTouches[0].pageY];
};

class GestureManager {
    constructor(options) {
        this.nodeManager = new NodeManager();
        this.gestureStateMachine = new GestureStateMachine(options);
    }

    /**
     * Handle a touch-start event that originated in a node registered with the
     * gesture system.
     *
     * @param {event} evt - the raw touch event from the browser
     */
    onTouchStart(evt) {
        const [x, y] = coordsForEvent(evt);
        this.gestureStateMachine.onTouchStart(
            this.nodeManager.idForCoords(x, y)
        );
    }

    /**
     * Handle a touch-move event that originated in a node registered with the
     * gesture system.
     *
     * @param {event} evt - the raw touch event from the browser
     */
    onTouchMove(evt) {
        const [x, y] = coordsForEvent(evt);
        this.gestureStateMachine.onTouchMove(
            this.nodeManager.idForCoords(x, y)
        );
    }

    /**
     * Handle a touch-end event that originated in a node registered with the
     * gesture system.
     *
     * @param {event} evt - the raw touch event from the browser
     */
    onTouchEnd(evt) {
        const [x, y] = coordsForEvent(evt);
        this.gestureStateMachine.onTouchEnd(
            this.nodeManager.idForCoords(x, y)
        );
    }

    /**
     * Handle a touch-cancel event that originated in a node registered with the
     * gesture system.
     *
     * @param {event} evt - the raw touch event from the browser
     */
    onTouchCancel(evt) {
        const [x, y] = coordsForEvent(evt);
        this.gestureStateMachine.onTouchCancel(
            this.nodeManager.idForCoords(x, y)
        );
    }

    /**
     * Register a DOM node with a given identifier.
     *
     * @param {string} id - the identifier of the given node
     * @param {node} domNode - the DOM node linked to the identifier
     */
    registerDOMNode(id, domNode) {
        this.nodeManager.registerDOMNode(id, domNode);
    }

    /**
     * Unregister the DOM node with the given identifier.
     *
     * @param {string} id - the identifier of the node to unregister
     */
    unregisterDOMNode(id) {
        this.nodeManager.unregisterDOMNode(id);
    }
}

module.exports = GestureManager;
