const puglint = require('gulp-pug-lint');
const runSequence = require('run-sequence');
const plumber = require('gulp-plumber');
const intercept = require('gulp-intercept');

module.exports = function(gulp, callback) {
    var lintWatch = htmlWatch;
    lintWatch.pop();
    var errorCount = 0;
    var errorMessage = [];
    return gulp.src(lintWatch)
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(puglint())
        .pipe(intercept(function(file) {
            if(file.puglint.errors.length > 0){
                errorCount = errorCount + file.puglint.errors.length;
                errorMessage.concat(file.puglint.errors);
                console.log(errorMessage);
            }
            return file;
        }))
        .on('end', function(){
            if(errorCount === 0 && global.isWatching && global.synced){
                runSequence('html:compile');
            }else if(errorCount > 0 && global.isWatching && global.synced){
                browserSync.notify(errorMessage.join("<br />"), errorTimeout);
            }
        });
};