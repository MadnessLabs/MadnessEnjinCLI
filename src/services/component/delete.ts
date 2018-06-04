const fs = require('fs-extra');
const rimraf = require('rimraf');


module.exports = function(name, config = false, callback = false) {
    var componentPath = `${config && config.srcDir ? config.srcDir : 'src'}/components/${name}`;
    fs.exists(componentPath, function(componentExists) {
        if (!componentExists) {
            console.log(`${name} component doesn't exist in your project!`);
            return false;
        }
        
        for (var i = 0, len = config.bundles.length; i < len; i++) {
            var index = config.bundles[i].components.indexOf(name);
            if (index >= 0) {
                config.bundles[i].components.splice(index, 1);
            }
        }

        rimraf(componentPath, () => { 
            if (callback && typeof callback === 'function') {
                callback(config);
            }
        });
    });
};