/**
 * An algorithm for computing the appropriate size of the buttons in the keypad,
 * taking into account a number of factors including the size of the screen, the
 * orientation of the screen, the presence of browser chrome, the presence of
 * other exercise-related chrome, the size of the input box, the parameters that
 * define the keypad (i.e., the number of rows, columns, and pages), and so
 * forth.
 *
 * The computations herein make some strong assumptions about the sizes of
 * various other elements and the situations under which they will be visible.
 * That makes the computation brittle. However, this is just a heuristic--it's
 * not crucial that our buttons are sized in a pixel-perfect manner, but rather,
 * that we make a balanced use of space.
 *
 * Note that one goal of the algorithm is to avoid resizing the keypad in the
 * face of dynamic browser chrome. In order to avoid that awkwardness, we tend
 * to be conservative in our measurements and make things smaller than they
 * might need to be.
 */

const {DeviceTypes, DeviceOrientations} = require('../consts');

const minButtonHeight = 48;
const maxButtonSize = 64;
const minSpaceAbovePopover = 32;

// These values are taken from an iPhone 5, but should be consistent with the
// iPhone 4 as well. Regardless, these are meant to be representative of the
// possible types of browser chrome that could appear in various context, rather
// than pixel-perfect for every device.
const safariNavBarWhenShrunk = 44;
const safariNavBarWhenExpanded = 64;
const safariToolbar = 44;

// In mobile Safari, the browser chrome is completely hidden in landscape,
// though a shrunken navbar and full-sized toolbar on scroll. In portrait, the
// shrunken navbar is always visible, but expands on scroll (and the toolbar
// appears as well).
const maxLandscapeBrowserChrome = safariNavBarWhenShrunk + safariToolbar;
const maxPortraitBrowserChrome = safariToolbar +
    (safariNavBarWhenExpanded - safariNavBarWhenShrunk);

// This represents the 'worst case' aspect ratio that we care about (for
// portrait layouts). It's taken from the iPhone 4. The height is computed by
// taking the height of the device and removing the persistent, shrunken navbar.
// (We don't need to account for the expanded navbar, since we include the
// difference when reserving space above the keypad.)
const worstCaseAspectRatio = 320 / (480 - safariNavBarWhenShrunk);

const computeButtonDimensions = function(numRows, numColumns, numPages,
                                         pageWidthPx, pageHeightPx,
                                         deviceOrientation, deviceType) {
    switch (deviceType) {
        case DeviceTypes.TABLET:
            return {
                widthPx: maxButtonSize,
                heightPx: maxButtonSize,
            };

        case DeviceTypes.PHONE:
            const isLandscape =
                deviceOrientation === DeviceOrientations.LANDSCAPE;

            // HACK(charlie): This is not great. We're encoding a bunch of
            // assumptions here about when certain pieces of chrome will be
            // included in the UI, and how tall they will be. Luckily, this is
            // just a heuristic, so we have some margin for error.
            const toolbarHeight = isLandscape ? 0 : 60;
            const pageIndicatorHeight = isLandscape || numPages === 1 ? 0 : 16;

            // In many cases, the browser chrome will already have been factored
            // into `pageHeightPx`. But we have no way of knowing if that's
            // the case or not. As such, we take a conservative approach and
            // assume that the chrome is _never_ included in `pageHeightPx`.
            const browserChromeHeight = isLandscape ? maxLandscapeBrowserChrome
                                                    : maxPortraitBrowserChrome;

            // Count up all the space that we need to reserve on the page.
            // Namely, we need to account for:
            //  1. Space between the keypad and the top of the page.
            //  2. The presence of the exercise toolbar.
            //  3. The presence of the view pager indicator.
            //  4. Any browser chrome that may appear later.
            //  5. The possibility of a popover rendering from the top row (in
            //     which case, we reserve space for an extra button above the
            //     keypad).
            const reservedSpace = minSpaceAbovePopover + maxButtonSize +
                toolbarHeight + pageIndicatorHeight + browserChromeHeight;

            // Next, compute the effective width and height. We can use the page
            // width as the effective width. For the height, though, we take
            // another conservative measure when in portrait by assuming that
            // the device has the worst possible aspect ratio. In other words,
            // we ignore the device height in portrait and assume the worst.
            // This prevents the keypad from changing size when browser chrome
            // appears and disappears.
            const effectiveWidth = pageWidthPx;
            const effectiveHeight =
                isLandscape ? pageHeightPx
                            : pageWidthPx / worstCaseAspectRatio;
            const maxKeypadHeight = effectiveHeight - reservedSpace;

            // Finally, compute the button height and width.
            const buttonHeightPx = Math.max(
                Math.min(
                    maxKeypadHeight / numRows,
                    maxButtonSize
                ),
                minButtonHeight
            );

            let buttonWidthPx;
            if (numPages > 1) {
                // Assumption: if we're in landscape, we render all pages at
                // once.
                const effectiveNumColumns = isLandscape ? numColumns * numPages
                                                        : numColumns;
                buttonWidthPx = effectiveWidth / effectiveNumColumns;
            } else {
                buttonWidthPx = isLandscape ? maxButtonSize
                                            : effectiveWidth / numColumns;
            }

            return {
                widthPx: buttonWidthPx,
                heightPx: buttonHeightPx,
            };
    }

    throw new Error("Invalid device type: " + deviceType);
};

module.exports = computeButtonDimensions;
