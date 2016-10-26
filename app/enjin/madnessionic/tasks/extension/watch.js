const watch = require('gulp-watch');
const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    global.isWatching = true;
    watch('app/extension/**/*.scss', function() {
        runSequence('extension:css');
    });
    watch('app/extension/**/*.ts', function() {
        runSequence('extension:build');
    });
    watch('app/extension/**/*.pug', function() {
        runSequence('extension:html');
    });
    watch(configFile, function() {
        runSequence('extension:build');
    });
    watch(appIcon, function() {
        runSequence('extension:icon');
    });
    watch(htmlWatch, function() {
        runSequence('html:compile', 'extension:copy');
    });
    watch(jsWatch, function() {
        runSequence('js:compile', 'extension:copy', 'extension:popup');
    });
};