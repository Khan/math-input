/**
 * Common parameters used to style components.
 */

const defaultButtonHeightPx = 60;

module.exports = {
    brightGreen: '#78C008',
    darkGrey: '#888D93',
    lightGrey: '#D6D8DA',
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
};
