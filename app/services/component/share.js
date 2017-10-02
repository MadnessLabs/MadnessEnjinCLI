var fs = require('fs-extra');

var getStencilConfig = require('../getStencilConfig');
var API = require('../API.js');


module.exports = function(name) {
    if (name.indexOf('-') <= 0) {
        console.log('Name must contain a "-" to be a valid custom element!');
        return false;
    }

    name = name.toLowerCase();

    getStencilConfig((stencilConfig) => {
        fs.exists(`${stencilConfig.srcDir ? stencilConfig.srcDir : 'src'}/components/${name}`, (componentExists) => {
            if (!componentExists) {
                console.log(`${name} component doesn't exists!`);
                return false;
            }

            console.log('Building your component...');
            
            console.log('Uploading your component...');
            
            console.log(`Here is the link to your component: ${'https://components.madnessenjin.net/asdf1234'}`);
        });
    });
    
};