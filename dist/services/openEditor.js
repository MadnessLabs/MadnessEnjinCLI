"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function openEditor(editor, folderPath) {
    child_process_1.exec(`${editor} .`, { cwd: folderPath }, (error, stdout, stderr) => {
        if (error) {
            console.log("Failed to open code editor!");
            throw new Error(error.message);
        }
    });
}
exports.openEditor = openEditor;
//# sourceMappingURL=openEditor.js.map