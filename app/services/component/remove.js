const fs = require('fs-extra');
const deleteComponent = require('./delete');


module.exports = function(name) {
    if (name.indexOf('-') <= 0) {
        console.log('Name must contain a "-" to be a valid custom element!');
        return false;
    }

    name = name.toLowerCase();

    deleteComponent(name, (newConfig) => {
        console.log(`${name} component has been deleted! ^_^`); 
    });
};