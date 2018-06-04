#! /usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const slash = require("slash");
const fs = require("fs-extra");
const enjinDir = slash(process.cwd());
const packageJSON = JSON.parse(fs.readFileSync(enjinDir + '/package.json'));
if (process.argv.length > 2) {
    process.argv.forEach(function (val, index, array) {
        if (index === 2) {
            var modulePath = 'app/commands/' + val;
            try {
                var command = require(enjinDir + '/' + modulePath);
                command(enjinDir);
            }
            catch (e) {
                if (typeof e === 'object' && e.message.indexOf('Cannot find module') >= 0) {
                    console.log('Sorry that command doesn\'t exist yet!');
                }
                else {
                    console.log(e);
                }
            }
        }
    });
}
else {
    var docs = fs.readFileSync(enjinDir + '/README.md', 'utf8');
    console.log(docs);
}
//# sourceMappingURL=index.js.map