const fs      = require('fs-extra');
const clean = require('gulp-clean');

module.exports = function(gulp, callback) {
    fs.copy(process.cwd() + '/components/www/build', process.cwd() + '/www/build', function(err){
        if(err){
            console.log(err);
        } else {
            callback();
        }
    });
};