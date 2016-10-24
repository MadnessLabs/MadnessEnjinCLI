const rename   = require('gulp-rename');
const template = require('gulp-template');


module.exports = function(name, dir) {
    gulp.src(tmplDir+'ts/filter.ts')
        .pipe(template({
            app: appName,
            name: name
        }))
        .pipe(rename(name+'.ts'))
        .pipe(gulp.dest(jsSrcDir+'filter/'));
};