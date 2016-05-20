/**
 * Common parameters used to style components.
 */

const defaultButtonHeightPx = 60;

module.exports = {
    brightGreen: '#78C008',
    darkGrey: '#888D93',
    lightGrey: '#D6D8DA',
    iconGrey: '#3B3E40',
    secondaryIconOpacity: 0.3,
    buttonBorderColor: '#ECECEC',
    buttonBorderStyle: 'solid',
    buttonBorderWidthPx: 1,
    defaultButtonHeightPx,
    // Compute the button height on request, as it's dependent on window size.
    getButtonHeightPx: () => {
        const numColumns = 5;
        const numRows = 4;

        if (typeof window === 'undefined') {
            return defaultButtonHeightPx;
        } else {
            const {
                clientWidth, clientHeight,
            } = window.document.documentElement;

            // Compute the button height as 1/5 of the screen width. If that
            // would cause the keyboard to cover the screen, then default to
            // 44px. This should mostly be for testing on desktop, though it
            // will also be the case in landscape.
            let buttonHeightPx = clientWidth / numColumns;
            if (clientHeight < buttonHeightPx * numRows) {
                buttonHeightPx = defaultButtonHeightPx;
            }

            return buttonHeightPx;
        }
    },
    iconSizeHeightPx: 48,
    iconSizeWidthPx: 48,
    cursorHandleRadiusPx: 11,

    // The amount to multiply the radius by to get the distance from the
    // center to the tip of the cursor handle.  The cursor is a circle with
    // one quadrant replace with a square.  The hypotenuse of the square is
    // 1.41 times the radius of the circle.
    cursorHandleDistanceMultiplier: 1.41,

    // Keypad button colors
    numeralGrey: '#FFF',
    commandGrey : '#FAFAFA',
    controlGrey : '#F6F7F7',
    disabledGrey : '#F0F1F2',
};
