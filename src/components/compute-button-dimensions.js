const {DeviceTypes} = require('../consts');

const minButtonHeightPx = 48;

// TODO(charlie): Parameterize these computations on the number of columns in
// the keypad. We're no longer assuming a 4x5 grid.
const numColumns = 5;
const numRows = 4;

const tabletWidthPx = 64;
const tabletHeightPx = 64;

// TODO(charlie): Refine this value. For now, it's derived roughly from a 96px
// buffer, with an extra 60px to account for the potential presence of the
// bottom bar. It doesn't account for, e.g., the view pager indicator, or the
// possible presence of Safari's bottom bar.
const minVerticalPaddingPx = 156;

const computeButtonDimensions = (screenWidthPx, screenHeightPx, deviceType) => {
    if (deviceType === DeviceTypes.TABLET) {
        return {
            widthPx: tabletWidthPx,
            heightPx: tabletHeightPx,
        };
    } else {
        const buttonWidthPx = screenWidthPx / numColumns;

        // Aim for a square aspect ratio. If that would leave the keypad too
        // tall, then we shrink the buttons, taking care to make them no shorter
        // than our minimum height.
        // TODO(charlie): Handle landscape phones differently. Instead, compute
        // the height and then enforce a fixed aspect ratio. The exact algorithm
        // is TBD.
        const maxKeypadHeightPx = screenHeightPx - minVerticalPaddingPx;
        const maxButtonHeightPx = maxKeypadHeightPx / numRows;
        const buttonHeightPx = Math.max(
            Math.min(buttonWidthPx, maxButtonHeightPx),
            minButtonHeightPx
        );

        return {
            widthPx: buttonWidthPx,
            heightPx: buttonHeightPx,
        };
    }
};

module.exports = computeButtonDimensions;
