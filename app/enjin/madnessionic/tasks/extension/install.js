const template = require('gulp-template');
const runSequence = require('run-sequence').use(gulp);
const jeditor = require('gulp-json-editor');
const fs = require('fs')


module.exports = function(gulp, callback) {
    var extension = JSON.parse(fs.readFileSync(tmplDir + 'extension/extension.json'));
    configJSON.extension = extension;
    gulp.src(configFile)
        .pipe(jeditor(configJSON))
        .pipe(gulp.dest('./'));
    gulp.src([tmplDir + 'extension/extension.pug', tmplDir + 'extension/extension.scss'])
        .pipe(gulp.dest('./app/extension'));
    gulp.src(tmplDir + 'extension/platform.ts')
        .pipe(template({
            app: appName
        }))
        .pipe(gulp.dest('./app/extension'));
    fs.appendFile('./.gitignore', '\nextension/\n!/app/extension');
    gulp.src(tmplDir + 'extension/backgroundService.ts')
        .pipe(template({
            app: appName
        }))
        .pipe(gulp.dest('./app/extension')).on('end', function() {
            runSequence('extension:icon', 'extension', callback);
        });
};