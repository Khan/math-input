/**
 * A single function used to scroll a DOM node into view, optionally taking into
 * account that it may be obscured by the custom keypad. The logic makes the
 * strong assumption that the keypad will be anchored to the bottom of the page
 * in calculating its height, as this method may be called before the keypad has
 * animated into view.
 *
 * TODO(charlie): Move this scroll logic out of our components and into a higher
 * level in the component tree--perhaps even into webapp, beyond Perseus.
 */

const scrollIntoView = (containerNode, keypadNode) => {
    const containerBounds = containerNode.getBoundingClientRect();
    const containerBottomPx = containerBounds.bottom;
    const containerTopPx = containerBounds.top;

    const marginPx = 16;

    if (keypadNode) {
        // NOTE(charlie): We can't use the bounding rect of the keypad,
        // as it is likely in the process of animating in. Instead, to
        // calculate its top, we make the strong assumption that the
        // keypad will end up anchored at the bottom of the page and use
        // its height, which is known at this point.
        const pageHeightPx = document.body.clientHeight;
        const keypadHeightPx = keypadNode.clientHeight;
        const keypadTopPx = pageHeightPx - keypadHeightPx;

        if (containerBottomPx > keypadTopPx) {
            // If the input would be obscured by the keypad, scroll such
            // that the bottom of the input is just above the top of the
            // keypad.
            const scrollOffset =
                containerBottomPx - keypadTopPx + marginPx;

            document.body.scrollTop += scrollOffset;
            return;
        }
    }

    // Alternatively, if the input is out of the viewport or nearly out
    // of the viewport, scroll it into view. We can do this regardless
    // of whether the keypad has been provided.
    if (containerTopPx < marginPx) {
        document.body.scrollTop -= containerBounds.height + marginPx;
    }
};

module.exports = scrollIntoView;
