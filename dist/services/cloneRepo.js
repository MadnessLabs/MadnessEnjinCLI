"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const expandGitLink = require("./expandGitLink");
function cloneRepo(stack, folderPath, callback) {
    stack = expandGitLink(stack);
    folderPath = folderPath
        ? folderPath
        : stack.split("/")[stack.split("/").length - 1];
    console.log("Cloning " + stack + " into " + folderPath + " ...");
    child_process_1.exec(`git clone ${stack} ${folderPath}`, callback);
}
exports.cloneRepo = cloneRepo;
//# sourceMappingURL=cloneRepo.js.map