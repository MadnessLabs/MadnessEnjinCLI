const template = require('gulp-template');
const ts = require('gulp-typescript');
const gulpif = require('gulp-if');
const cache = require('gulp-cached');
const addsrc = require('gulp-add-src');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');


module.exports = function(gulp, callback) {
    var tsResult = gulp.src(tmplDir + 'ts/app.ts')
        .pipe(template({app: appName, plugins: JSON.stringify(configJSON.extension.plugins).slice(1,-1).replace(/"/g, "'").replace(/,/g, ", \n\t\t")}))
        .pipe(replace('../', '../../../../app/'))
        .pipe(gulpif(global.isWatching, plumber({
            errorHandler: function(error) {
                browserSync.notify(error.message, errorTimeout);
                this.emit('end');
            }
        })))
        .pipe(gulpif(global.isWatching,  cache('extension-js')))
        .pipe(addsrc('app/typings/index.d.ts'))
        .pipe(ts({
            "compilerOptions": {
                "target": "es5",
                "sourceMap": false
            }
        }));

        tsResult.dts.pipe(gulp.dest('extension/build'));
        tsResult.js.pipe(gulp.dest('extension/build')).on('end', function() {
            callback();
        });
};