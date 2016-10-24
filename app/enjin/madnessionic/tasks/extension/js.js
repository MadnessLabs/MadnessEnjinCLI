const template = require('gulp-template');
const ts = require('gulp-typescript');
const gulpif = require('gulp-if');
const cache = require('gulp-cached');
const addsrc = require('gulp-add-src');
const plumber = require('gulp-plumber');


module.exports = function(gulp, callback) {
    var tsResult = gulp.src(['app/extension/**/*.ts'])
        .pipe(gulpif(global.isWatching, plumber({
            errorHandler: function(error) {
                browserSync.notify(error.message, errorTimeout);
                this.emit('end');
            }
        })))
        .pipe(gulpif(global.isWatching,  cache('extension:js')))
        .pipe(addsrc('app/typings/index.d.ts'))
        .pipe(ts({
            "compilerOptions": {
                "target": "es5",
                "sourceMap": false
            }
        }));

        tsResult.dts.pipe(gulp.dest('extension/js'));
        tsResult.js.pipe(gulp.dest('extension/js')).on('end', function() {
            callback();
        });
};