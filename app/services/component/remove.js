const fs = require('fs-extra');

const getStencilConfig = require('../getStencilConfig');
const editStencilConfig = require('../editStencilConfig');
const deleteComponent = require('./delete');


module.exports = function(name) {
    if (name.indexOf('-') <= 0) {
        console.log('Name must contain a "-" to be a valid custom element!');
        return false;
    }

    name = name.toLowerCase();

    getStencilConfig((stencilConfig, stencilPath) => {
        deleteComponent(name, stencilConfig, (newConfig) => {
            editStencilConfig(stencilPath, newConfig, () => {
                console.log(`${name} component has been deleted! ^_^`); 
            });
        });
    });
};