"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Removes any character that isn't a letter, number, hyphen, underscore, or at sign
 * @param string The string to clean
 * @returns The cleaned string
 *
 * @example cleanString("Madness Enjin CLI is awesome-sauce!") => "MadnessEnjinCLIisawesome-sauce"
 */
function cleanString(string) {
    return string.replace(/[^A-Za-z0-9-_@]/g, "");
}
exports.cleanString = cleanString;
//# sourceMappingURL=cleanString.js.map