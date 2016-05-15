/**
 * This file contains all of the z-index values used throughout the math-input
 * component and its children.  The goal of the different z-indexes is to have
 * a container that clips the selection rectangle while allowing the cursor
 * handle to extend below the bounds of the outer container.
 */

module.exports = {
    selectionRect: -1,
    keypad: 1060,
};
