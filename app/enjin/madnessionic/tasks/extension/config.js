const template = require('gulp-template');


module.exports = function(gulp, callback) {
    return gulp.src(tmplDir+'extension/config.js')
        .pipe(template({
            configJSON: JSON.stringify(configJSON, null, 4)
        }))
        .pipe(gulp.dest('extension/build'));
};