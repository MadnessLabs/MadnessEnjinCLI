const _       = require('lodash');
const fs      = require('fs');
const exec    = require('child_process').exec;


module.exports = function(enjinDir) {
    console.log('Copying new files...');
    exec('npm install --save gulp-require-tasks', function(error, stdout, stderr) {
        var gulpfilePath = enjinDir + '/app/boilerplates/madnessionic/gulpfile.js';
        fs.readFile(gulpfilePath, 'utf8', function(err, contents) {
            var compiled = _.template(contents);
            var gulpfile = compiled({ 
                enjinDir: enjinDir, 
                stack: 'madnessionic'
            });
            fs.writeFile(process.cwd() + '/gulpfile.js', gulpfile, function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log('Running update command ...');
                exec('gulp enjin:update', function(error, stdout, stderr) {
                    console.log('Updating project dependencies ...');
                    exec('npm prune', function() {
                        exec('npm update', function(error, stdout, stderr) {
                            console.log('Applicaiton migrated successfully! ^_^');
                        });
                    });
                });
            });
        });
    });
};