/**
 * A manager for our node-to-ID system. In particular, this class is
 * responsible for maintaing a mapping between DOM nodes and node IDs, and
 * translating touch events from the raw positions at which they occur to the
 * nodes over which they are occurring. This differs from browser behavior, in
 * which touch events are only sent to the node in which a touch started.
 */

class NodeManager {
    constructor() {
        // A mapping from IDs to DOM nodes.
        this._nodesById = {};

        // An ordered list of IDs, where DOM nodes that are "higher" on the
        // page come earlier in the list. Note that an ID may be present in
        // this ordered list but not be registered to a DOM node (i.e., if it
        // is registered as a child of another DOM node, but hasn't appeared in
        // the DOM yet).
        this._orderedIds = [];
    }

    /**
     * Register a DOM node with a given identifier.
     *
     * @param {string} id - the identifier of the given node
     * @param {node} domNode - the DOM node linked to the identifier
     */
    registerDOMNode(id, domNode, childIds) {
        this._nodesById[id] = domNode;

        // Make sure that any children appear first.
        // TODO(charlie): This is a very simplistic system that wouldn't
        // properly handle multiple levels of nesting.
        const allIds = [...(childIds || []), id, ...this._orderedIds];

        // De-dupe the list of IDs.
        const orderedIds = [];
        const seenIds = {};
        for (const id of allIds) {
            if (!seenIds[id]) {
                orderedIds.push(id);
                seenIds[id] = true;
            }
        }

        this._orderedIds = orderedIds;
    }

    /**
     * Unregister the DOM node with the given identifier.
     *
     * @param {string} id - the identifier of the node to unregister
     */
    unregisterDOMNode(id) {
        delete this._nodesById[id];
    }

    /**
     * Return the identifier of the topmost node located at the given
     * coordinates.
     *
     * @param {number} x - the x coordinate at which to search for a node
     * @param {number} y - the y coordinate at which to search for a node
     * @returns {null|string} - null or the identifier of the topmost node at
     *                          the given coordinates
     */
    idForCoords(x, y) {
        const endNode = document.elementFromPoint(x, y);
        for (const id of this._orderedIds) {
            const domNode = this._nodesById[id];
            if (domNode && domNode.contains(endNode)) {
                return id;
            }
        }
    }

    /**
     * Return a function that computes the identifier of the topmost node
     * located at the given coordinates, and memoizes the result.
     *
     * @param {number} x - the x coordinate at which to search for a node
     * @param {number} y - the y coordinate at which to search for a node
     * @returns {() -> null|string} - a function that returns the result of
     *                                calling `idForCoords` on the given
     *                                coordinates, and memoizes the result
     */
    idComputationForCoords(x, y) {
        let hasComputedId = false;
        let id = null;
        return () => {
            if (!hasComputedId) {
                id = this.idForCoords(x, y);
                hasComputedId = true;
            }
            return id;
        };
    }

    /**
     * Return the bounding client rect for the node with the given identifier.
     *
     * @param {string} id - the identifier of the node for which to return the
     *                      bounding client rect
     * @returns {rect} - the bounding client rect for the given node
     */
    boxForId(id) {
        return this._nodesById[id].getBoundingClientRect();
    }
}

module.exports = NodeManager;
