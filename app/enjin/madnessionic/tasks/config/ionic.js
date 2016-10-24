const jeditor = require("gulp-json-editor");

const cleanString = require('../../services/cleanString');


module.exports = function(gulp, callback) {
    return gulp.src('ionic.config.json')
        .pipe(jeditor(function(json) {
            json.name = cleanString(appName).toLowerCase();
            return json; 
        }))
        .pipe(gulp.dest("./"));
};