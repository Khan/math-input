/**
 * Common parameters used to style components.
 */

module.exports = {
    brightGreen: '#78C008',
    gray17: '#21242C',
    gray25: '#3B3E40',
    gray68: '#888D93',
    gray76: '#BABEC2',
    gray85: '#D6D8DA',
    secondaryIconOpacity: 0.3,
    buttonBorderColor: '#ECECEC',
    buttonBorderStyle: 'solid',
    buttonBorderWidthPx: 1,
    iconSizeHeightPx: 48,
    iconSizeWidthPx: 48,
    cursorHandleRadiusPx: 11,

    // The amount to multiply the radius by to get the distance from the
    // center to the tip of the cursor handle.  The cursor is a circle with
    // one quadrant replace with a square.  The hypotenuse of the square is
    // 1.41 times the radius of the circle.
    cursorHandleDistanceMultiplier: 1.41,

    // Keypad button colors
    valueGrey: '#FFF',
    operatorGrey : '#FAFAFA',
    controlGrey : '#F6F7F7',
    emptyGrey : '#F0F1F2',

    // The width at which a device is classified as a "tablet" for the purposes
    // of the keypad layout.
    tabletCutoffPx: 600,
};
