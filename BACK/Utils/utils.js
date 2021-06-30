/**
 * Generate a code with lowercase and upercase letters and numbers
 * @param {number} length Number of characters in the code
 * @returns {string} The generated code
 */
function makeCode(length) {
    var result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        result.push(randomChar);
    }

    return result.join('');
}

/**
 * Get hexadecimal random color
 * @returns {string} Hexadecimal color
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

/**
 * Determine if a color is dark
 * @param {string} color Color to test
 * @returns {boolean} True if color is dark
 */
function isDarkColor(color) {
    const c = color.substring(1);  // strip #
    const rgb = parseInt(c, 16);   // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >> 8) & 0xff;   // extract green
    const b = (rgb >> 0) & 0xff;   // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma < 40;
}

exports.makeCode = makeCode;
exports.getRandomColor = getRandomColor;
exports.isDarkColor = isDarkColor;