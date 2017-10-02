const fs = require('fs-extra');


module.exports = function(filePath, configJSON, callback) {
    if (filePath.indexOf('enjin') >= 0) {
        var enjinJSON = require(filePath);
        enjinJSON.stenciljs = configJSON;
        fs.writeJson(filePath, enjinJSON, (err) => {
            if (err) {
                console.log('Couldn\'t write enjin.json!');
                return false;
            }
            if (callback && typeof callback === 'function') {
                callback();
            }
        });
    } else {
        fs.readFile(filePath, 'utf8', function(error, data) {
            if (error) {
                console.log('Couldn\'t read stencil.config.js!');
                return false;
            }
    
            var newStencilJS = data.replace(/exports.config ?= ?[^;]*/, 'exports.config = ' + JSON.stringify(configJSON, null, 2));
            fs.writeFile(filePath, newStencilJS, function(error) {
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
}