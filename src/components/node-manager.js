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
    }

    /**
     * Register a DOM node with a given identifier.
     *
     * @param {string} id - the identifier of the given node
     * @param {node} domNode - the DOM node linked to the identifier
     */
    registerDOMNode(id, domNode, childIds) {
        this._nodesById[id] = domNode;
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
     * Return the identifier of the node located at the given coordinates.
     *
     * @param {number} x - the x coordinate at which to search for a node
     * @param {number} y - the y coordinate at which to search for a node
     * @returns {null|string} - null or the identifier of the node at the given
     *                          coordinates
     */
    idForCoords(x, y) {
        const endNode = document.elementFromPoint(x, y);
        for (const [id, domNode] of Object.entries(this._nodesById)) {
            if (domNode.contains(endNode)) {
                return id;
            }
        }
    }
}

module.exports = NodeManager;
