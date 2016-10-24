const template = require('gulp-template');


module.exports = function(gulp, callback) {
    return gulp.src(tmplDir+'ts/app.ts')
        .pipe(template({
            app: appName,
            plugins: JSON.stringify(appPlugins).slice(1,-1).replace(/"/g, "'").replace(/,/g, ", \n\t\t")
        }))
        .pipe(gulp.dest(jsSrcDir));
};