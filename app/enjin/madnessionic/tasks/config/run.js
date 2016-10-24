const template = require('gulp-template');

module.exports = function(gulp, callback) {
    return gulp.src(tmplDir + 'ts/run.ts')
        .pipe(template({app: appName}))
        .pipe(gulp.dest(jsSrcDir));
};