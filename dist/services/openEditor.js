"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function default_1(editor, folderPath) {
    child_process_1.exec(`${editor} .`, { cwd: folderPath }, (error, stdout, stderr) => {
        if (error) {
            console.log('Failed to open code editor!');
            return false;
        }
    });
}
exports.default = default_1;
;
//# sourceMappingURL=openEditor.js.map