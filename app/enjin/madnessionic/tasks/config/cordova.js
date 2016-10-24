const runSequence = require('run-sequence').use(gulp);
const template = require('gulp-template');

const cleanString = require('../../services/cleanString');


module.exports = function(gulp, callback) {
    return gulp.src(tmplDir+'config/config.xml')
        .pipe(template({
            name: cleanString(appName).toLowerCase(),
            title: appName,
            description: appDesc,
            version: appVersion,
            author: appAuthor.name,
            email: appAuthor.email,
            url: appAuthor.url
        }))
        .pipe(gulp.dest("./"));
};