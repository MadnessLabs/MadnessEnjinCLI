const template = require('gulp-template');
const ts = require('gulp-typescript');
const gulpif = require('gulp-if');
const cache = require('gulp-cached');
const addsrc = require('gulp-add-src');
const plumber = require('gulp-plumber');


module.exports = function(gulp, callback) {
    var tsResult = gulp.src(['app/extension/**/*.ts', 'extension/build/router.ts'])
        .pipe(gulpif(global.isWatching, plumber({
            errorHandler: function(error) {
                browserSync.notify(error.message, errorTimeout);
                this.emit('end');
            }
        })))
        .pipe(gulpif(global.isWatching,  cache('extension:js')))
        .pipe(addsrc('app/typings/index.d.ts'))
        .pipe(ts());

        tsResult.dts.pipe(gulp.dest('extension/build'));
        tsResult.js.pipe(gulp.dest('extension/build')).on('end', function() {
            callback();
        });
};