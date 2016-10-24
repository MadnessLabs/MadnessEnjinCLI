const clean = require('gulp-clean');
const jeditor = require('gulp-json-editor');


module.exports = function(gulp, callback) {
    gulp.src(['app/extension', 'extension'], {read: false})
        .pipe(clean({force: true}));
    gulp.src(configFile)
        .pipe(jeditor(function(json) {
            delete json.extension;
            return json; 
        }))
        .pipe(gulp.dest("./"))
        .on('end', function() {
            callback();
        });
};