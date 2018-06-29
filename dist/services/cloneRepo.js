"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const expandGitLink_1 = require("./expandGitLink");
/**
 * Clones a git repository into the desired folder and runs a callback on completion
 * @param stack The stack or Git repo to clone
 * @param folderPath The folder dir to clone into
 * @param callback A function to run when the clone is complete
 */
function cloneRepo(stack, folderPath, callback) {
    const stackRepo = expandGitLink_1.expandGitLink(stack);
    const cloneToDir = folderPath
        ? folderPath
        : stackRepo.split("/")[stackRepo.split("/").length - 1].split(".git")[0];
    console.log(`Cloning ${stackRepo} into ${cloneToDir}...`);
    child_process_1.exec(`git clone ${stackRepo} ${cloneToDir}`, callback);
}
exports.cloneRepo = cloneRepo;
//# sourceMappingURL=cloneRepo.js.map