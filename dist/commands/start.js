"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const appStart_1 = require("../services/appStart");
module.exports = function (enjinDir) {
    var stack = process.argv[3];
    var name = process.argv[4];
    var editor = yargs_1.argv.editor ? yargs_1.argv.editor : yargs_1.argv.e;
    const repo = yargs_1.argv.repo ? yargs_1.argv.repo : yargs_1.argv.r;
    appStart_1.appStart(stack, name, editor, repo);
};
//# sourceMappingURL=start.js.map