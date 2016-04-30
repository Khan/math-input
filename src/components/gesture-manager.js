/**
 * A high-level manager for our gesture system. In particular, this class
 * connects our various bits of logic for managing gestures and interactions,
 * and links them together.
 */

const NodeManager = require('./node-manager');
const PopoverStateMachine = require('./popover-state-machine');
const GestureStateMachine = require('./gesture-state-machine');

const coordsForEvent = (evt) => {
    return [evt.changedTouches[0].pageX, evt.changedTouches[0].pageY];
};

class GestureManager {
    constructor(options, handlers) {
        const { swipeEnabled } = options;

        this.swipeEnabled = swipeEnabled;

        this.nodeManager = new NodeManager();
        this.popoverStateMachine = new PopoverStateMachine({
            onActiveNodesChanged: handlers.onActiveNodesChanged,
            onClick: handlers.onClick,
        });
        this.gestureStateMachine = new GestureStateMachine({
            onFocus: (id) => {
                this.popoverStateMachine.onFocus(id);
            },
            onBlur: () => {
                this.popoverStateMachine.onBlur();
            },
            onTouchEnd: (id) => {
                this.popoverStateMachine.onTouchEnd(id);
            },
            onSwipeChange: handlers.onSwipeChange,
            onSwipeEnd: handlers.onSwipeEnd,
        });
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
            this.nodeManager.idForCoords(x, y),
            x
        );

        // If an event started in a view that we're managing, we'll handle it
        // all the way through.
        evt.preventDefault();
    }

    /**
     * Handle a touch-move event that originated in a node registered with the
     * gesture system.
     *
     * @param {event} evt - the raw touch event from the browser
     */
    onTouchMove(evt) {
        const swipeLocked = this.popoverStateMachine.isPopoverVisible();
        const swipeEnabled = this.swipeEnabled && !swipeLocked;
        const [x, y] = coordsForEvent(evt);
        this.gestureStateMachine.onTouchMove(
            this.nodeManager.idForCoords(x, y),
            x,
            swipeEnabled
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
            this.nodeManager.idForCoords(x, y),
            x
        );
    }

    /**
     * Handle a touch-cancel event that originated in a node registered with the
     * gesture system.
     *
     * @param {event} evt - the raw touch event from the browser
     */
    onTouchCancel(evt) {
        this.gestureStateMachine.onTouchCancel();
    }

    /**
     * Register a DOM node with a given identifier.
     *
     * @param {string} id - the identifier of the given node
     * @param {node} domNode - the DOM node linked to the identifier
     * @param {string[]} childIds - the identifiers of any DOM nodes that
     *                              should be considered children of this node,
     *                              in that they should take priority when
     *                              intercepting touch events
     */
    registerDOMNode(id, domNode, childIds) {
        this.nodeManager.registerDOMNode(id, domNode, childIds);
        this.popoverStateMachine.registerPopover(id, childIds);
    }

    /**
     * Unregister the DOM node with the given identifier.
     *
     * @param {string} id - the identifier of the node to unregister
     */
    unregisterDOMNode(id) {
        this.nodeManager.unregisterDOMNode(id);
        this.popoverStateMachine.unregisterPopover(id);
    }
}

module.exports = GestureManager;
