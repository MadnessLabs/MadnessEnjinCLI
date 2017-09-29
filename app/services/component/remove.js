const fs = require('fs-extra');
const rimraf = require('rimraf');

const editStencilConfig = require('../editStencilConfig');


module.exports = function(name) {
    if (name.indexOf('-') <= 0) {
        console.log('Name must contain a "-" to be a valid custom element!');
        return false;
    }

    name = name.toLowerCase();

    var stencilPath = process.cwd() + '/stencil.config.js';
    fs.exists(stencilPath, function(exists) {
        if (exists) {
            var stenciljs = require(stencilPath);

            for (var i = 0, len = stenciljs.config.bundles.length; i < len; i++) {
                var arr = stenciljs.config.bundles[i];
                var index = arr.components.indexOf(name);
                if (index >= 0) {
                    arr.components.splice(index, 1);
                }
            }

            rimraf(`${stenciljs.config.srcDir ? stenciljs.config.srcDir : 'src'}/components/${name}`, () => { 
                editStencilConfig(stencilPath, stenciljs.config, () => {
                    console.log(`${name} component has been deleted! ^_^`); 
                });
            });
        } else {
            console.log('To create a component stencil.config.js is required!');
        }
    });
};