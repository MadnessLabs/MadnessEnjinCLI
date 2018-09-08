const fs = require('fs-extra');
const rimraf = require('rimraf');


module.exports = function(name, callback = false) {
    var componentPath = `src/components/${name}`;
    fs.exists(componentPath, function(componentExists) {
        if (!componentExists) {
            console.log(`${name} component doesn't exist in your project!`);
            return false;
        }

        rimraf(componentPath, () => { 
            if (callback && typeof callback === 'function') {
                callback(true);
            }
        });
    });
};