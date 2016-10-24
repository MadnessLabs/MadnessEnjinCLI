const rename = require('gulp-rename');
const minifycss = require('gulp-minify-css');

module.exports = function(gulp, callback) {
    return gulp.src(cssDestDir+cssDestFile)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDestDir));
};