const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require("path");

const getStencilConfig = require('../getStencilConfig');
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

    getStencilConfig((stencilConfig, stencilPath) => {
        renderComponent(data, stencilConfig, () => {
            stencilConfig.bundles[0].components.push(name);
            editStencilConfig(stencilPath, stencilConfig, () => {
                console.log(`${name} component has been created successfully! ^_^`);
            });
        });
    });
};