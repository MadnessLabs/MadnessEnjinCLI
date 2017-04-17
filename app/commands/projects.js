const fs      = require('fs');
const API = require('../services/API');

module.exports = function(enjinDir) {
    console.log('');
    console.log('Listing all projects from MadnessEnjin.net...');
    console.log('-------------------------------')
    new API('get', 'project', {}, (data) => {
        data.forEach(function(project) {
            console.log(`${project.name} - https://github.com/${project.github}\n`);
        });
    });
    
};