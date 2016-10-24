const clean    = require('gulp-clean');


module.exports = function(name) {
    gulp.src([
        jsSrcDir+'filter/'+name+'.ts'
    ],{
        read: false
    })
    .pipe(clean({force: true}));
};