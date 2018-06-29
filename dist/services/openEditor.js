"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
/**
 * Opens code editor in a desired folder
 * @param editor The code editor program you want to open
 * @param folderPath The folder you want the code editor to open in
 */
function openEditor(editor, folderPath) {
    child_process_1.exec(`${editor} .`, { cwd: folderPath }, error => {
        if (error) {
            console.log("Failed to open code editor!");
            throw new Error(error.message);
        }
    });
}
exports.openEditor = openEditor;
//# sourceMappingURL=openEditor.js.map