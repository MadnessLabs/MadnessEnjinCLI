const runSequence = require('run-sequence').use(gulp);
const inquirer    = require('inquirer');
const jeditor     = require("gulp-json-editor");

const setVars     = require('../services/setVars');
const addPage     = require('../services/addPage');
const cleanString = require('../services/cleanString');

module.exports = function(gulp, callback) {
    inquirer.prompt([{
        type: 'input',
        message: 'What is the name of your new app?',
        default: appName,
        name: 'name'
    },{
        type: 'input',
        message: 'How would you describe your new app?',
        default: appDesc,
        name: 'description'
    },{
        type: 'input',
        message: 'What is the url of your app?',
        default: appUrl,
        name: 'url'
    },{
        type: 'input',
        message: 'Who is the author of this app?',
        default: appAuthor.name,
        name: 'author'
    },{
        type: 'input',
        message: 'What is the author\'s website url?',
        default: appAuthor.url,
        name: 'authorUrl'
    },{
        type: 'input',
        message: 'What is the author\'s email?',
        default: appAuthor.email,
        name: 'authorEmail'
    },{
        type: 'input',
        message: 'What pages would you like to start with? (Comma Separated)',
        default: 'home',
        name: 'pages',
    }], function(res) {
        gulp.src('./enjin.json')
        .pipe(jeditor(function(json) {
            json.name = cleanString(res.name);
            json.author.name = res.author;
            json.author.url = res.authorUrl;
            json.author.email = res.authorEmail;
            json.url = res.url;
            json.description = res.description;
            return json; 
        }))
        .pipe(gulp.dest("./"))
        .on('end', function(){
            setVars();

            if (res.pages.indexOf(',')) {
                var pages = res.pages.split(',');
                
                for (var i = 0; i < pages.length; i++) {
                    addPage(pages[i], []);
                }
            } else {
                addPage(res.pages, []);
            }

            runSequence(
                'clean:build',
                'clean:install',
                'js:app',
                'config:run',
                'config:js', 
                'config:css', 
                'config:ionic',
                'config:cordova', 
                'config:node', 
                'config:sublime',
                'typings',
                'font:copy',
                'img:icon:favorite',
                'img:icon:copy', 
                'html:template',
                'html:build', 
                'css:import', 
                'css:libraries', 
                'css:compile', 
                'css:concat',  
                'js:compile', 
                'js:concat', 
                'sync:start',
                'workbox', 
                'watch',
                callback
            );
        });
    });
};