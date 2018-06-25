"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const rimraf = require("rimraf");
const cleanString_1 = require("./cleanString");
const cloneRepo_1 = require("./cloneRepo");
const appInstall_1 = require("./appInstall");
const openEditor_1 = require("./openEditor");
const updatePackage_1 = require("./updatePackage");
const expandGitLink_1 = require("./expandGitLink");
/**
 * Clone a repo, run npm install, and optionally, you can open your favorite editor or link to a repo as origin
 * @param stack The stack or repo to use as a bolierplate for your new app
 * @param name The name of your new app (This will be used )
 * @param editor The code editor to open after app is installed
 * @param repo The Git repo to link as origin
 */
function appStart(stack, name, editor, repo) {
    return __awaiter(this, void 0, void 0, function* () {
        let repoLink;
        if (!stack) {
            throw new Error("Stack name or repo link is required!");
        }
        if (!name) {
            throw new Error("App name is required to start your new project!");
        }
        if (repo) {
            repoLink = expandGitLink_1.expandGitLink(repo);
        }
        const newAppName = cleanString_1.cleanString(name);
        const appDir = process.cwd() + "/" + newAppName;
        cloneRepo_1.cloneRepo(stack, newAppName, err => {
            if (err) {
                throw new Error(err);
            }
            rimraf(`${appDir}/.git`, () => {
                if (err) {
                    throw new Error(err);
                }
                child_process_1.exec(`git init`, { cwd: appDir }, initError => {
                    if (initError) {
                        console.error("Failed to remove .git origin remote!");
                    }
                    else if (repoLink) {
                        child_process_1.exec(`git remote add origin ${repoLink}`, { cwd: appDir }, remoteError => {
                            if (remoteError) {
                                console.error(`Failed to add ${repoLink} origin remote!`);
                            }
                            else {
                                console.log(`Added ${repoLink} as origin remote...`);
                            }
                        });
                    }
                });
            });
            updatePackage_1.updatePackage({ name: newAppName.toLowerCase() }, false, appDir);
            appInstall_1.appInstall(appDir, stdout => {
                console.log(stdout);
                console.log("Your app has been installed successfully! ^_^");
                if (editor) {
                    console.log("Now opening project in your selected editor...");
                    openEditor_1.openEditor(editor, appDir);
                }
                return {
                    stdout
                };
            });
        });
    });
}
exports.appStart = appStart;
//# sourceMappingURL=appStart.js.map