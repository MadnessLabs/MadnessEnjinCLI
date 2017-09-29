const fs = require('fs-extra');

module.exports = function(stencilPath, configJSON, callback) {
    fs.readFile(stencilPath, 'utf8', function(error, data) {
        if (error) {
            console.log('Couldn\'t read stencil.config.js!');
            return false;
        }

        var newStencilJS = data.replace(/exports.config ?= ?[^;]*/, 'exports.config = ' + JSON.stringify(configJSON, null, 2));
        fs.writeFile(stencilPath, newStencilJS, function(error) {
            if (error) {
                console.log('Couldn\'t write stencil.config.js!');
                return false;
            }

            if (callback && typeof callback === 'function') {
                callback();
            }
        });
    });
}