const fs = require('fs-extra');


module.exports = function(callback = false, context = process.cwd()) {
    try {
        var enjinPath = context + '/enjin.json';
        var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
        if (!enjinJSON.stenciljs) {
            throw 'No stenciljs config in your enjin.json file!';
        }

        if (callback && typeof callback === 'function') {
            callback(enjinJSON.stenciljs, enjinPath);
        }
    } catch(e) {
        console.log('No enjin.json file found in the current directory, trying stencil.config.js...');
        var stencilPath = context + '/stencil.config.js';
        fs.exists(stencilPath, function(stencilExists) {
            if (stencilExists) {
                var stenciljs = require(stencilPath);
                if (callback && typeof callback === 'function') {
                    callback(stenciljs.config, stencilPath);
                }
            }
        });
    }
};