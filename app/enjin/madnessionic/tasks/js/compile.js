const gulpif  = require('gulp-if');
const addsrc  = require('gulp-add-src');
const ts      = require('gulp-typescript');
const cache   = require('gulp-cached');
const plumber = require('gulp-plumber');

module.exports = function(gulp, callback) {
    var tsResult = gulp.src(jsWatch)
        .pipe(gulpif(global.isWatching, plumber({
            errorHandler: function(error) {
                browserSync.notify(error.message, errorTimeout);
                this.emit('end');
            }
        })))
        .pipe(gulpif(global.isWatching,  cache('js:compile')))
        .pipe(addsrc('app/typings/index.d.ts'))
        .pipe(ts({
            "compilerOptions": {
                "target": "es5",
                "sourceMap": false
            }
        }));

        tsResult.dts.pipe(gulp.dest('build/js'));
        tsResult.js.pipe(gulp.dest('build/js')).on('end', function() {
            callback();
        });
};
