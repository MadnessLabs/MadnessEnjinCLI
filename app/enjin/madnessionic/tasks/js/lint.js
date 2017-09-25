const gulpif      = require('gulp-if');
const tslint      = require('gulp-tslint');
const intercept   = require('gulp-intercept');
const runSequence = require('run-sequence').use(gulp);
const cache       = require('gulp-cached');
const plumber     = require('gulp-plumber');


module.exports = function(gulp, callback) {
    var errorCount = 0;
    return gulp.src(jsWatch)
        .pipe(gulpif(global.isWatching, plumber({
            errorHandler: function(error) {
                cache.caches = {};
                browserSync.notify(error.message, errorTimeout);
                this.emit('end');
            }
        })))
        .pipe(gulpif(global.isWatching,  cache('js:lint')))
        .pipe(tslint())
        .pipe(tslint.report('prose'))
        .pipe(intercept(function(file) {
            errorCount = errorCount + file.tslint.failureCount;
            return file;
        }))
        .on('end', function(){
            if(errorCount === 0 && global.isWatching && global.synced){
                runSequence('js:compile', 'js:concat');
            }
        });
};