const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require("path");

const editStencilConfig = require('../editStencilConfig');
const camelize = require('../camelize');
const capFirstLetter = require('../capFirstLetter');
const renderComponent = require('./render');


module.exports = function(name, props) {
    if (name.indexOf('-') <= 0) {
        console.log('Name must contain a "-" to be a valid custom element!');
        return false;
    }

    name = name.toLowerCase();

    if (props) {
        if (props.indexOf(',') > 0) {
            props = props.split(',');
        } else {
            props = [props];
        }
    }

    var data = {
        name,
        className: capFirstLetter(camelize(name.replace('-', ' '))),
        props
    };

    try {
        var enjinPath = process.cwd() + '/enjin.json';
        var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
        if (!enjinJSON.stenciljs) {
            throw 'No stenciljs config in your enjin.json file!';
        }

        renderComponent(data, enjinJSON.stenciljs, () => {
            enjinJSON.stenciljs.bundles[0].components.push(name);
            fs.writeJson(enjinPath, enjinJSON, () => {
                console.log(`${name} component has been created successfully! ^_^`);
            });
        });
    } catch(e) {
        console.log('No enjin.json file found in the current directory, trying stencil.config.js...');
        var stencilPath = process.cwd() + '/stencil.config.js';
        fs.exists(stencilPath, function(stencilExists) {
            if (stencilExists) {
                var stenciljs = require(stencilPath);

                renderComponent(data, stenciljs.config, () => {
                    stenciljs.config.bundles[0].components.push(name);
                    editStencilConfig(stencilPath, stenciljs.config, () => {
                        console.log(`${name} component has been created successfully! ^_^`);
                    });
                });
            } else {
                console.log('To create a component stencil.config.js is required!');
                return false;
            }
        });
    }
};