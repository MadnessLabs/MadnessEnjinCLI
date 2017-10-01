const fs = require('fs-extra');

const editStencilConfig = require('../editStencilConfig');
const deleteComponent = require('./delete');


module.exports = function(name) {
    if (name.indexOf('-') <= 0) {
        console.log('Name must contain a "-" to be a valid custom element!');
        return false;
    }

    name = name.toLowerCase();

    try {
        var enjinPath = process.cwd() + '/enjin.json';
        var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
        if (!enjinJSON.stenciljs) {
            throw 'No stenciljs config in your enjin.json file!';
        }

        deleteComponent(name, enjinJSON.stenciljs, (newConfig) => {
            enjinJSON.stenciljs = newConfig;
            fs.writeJson(enjinPath, enjinJSON, () => {
                console.log(`${name} component has been deleted! ^_^`);
            });
        });
    } catch(e) {
        var stencilPath = process.cwd() + '/stencil.config.js';
        fs.exists(stencilPath, function(stencilExists) {
            if (stencilExists) {
                var stenciljs = require(stencilPath);
                deleteComponent(name, stenciljs.config, (newConfig) => {
                    editStencilConfig(stencilPath, newConfig, () => {
                        console.log(`${name} component has been deleted! ^_^`); 
                    });
                });
            } else {
                console.log('To create a component stencil.config.js is required!');
            }
        });
    }
};