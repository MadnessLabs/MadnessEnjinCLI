const clean    = require('gulp-clean');


module.exports = function(name) {
    gulp.src([
        jsSrcDir+'resolver/'+name+'.ts'
    ],{
        read: false
    })
    .pipe(clean({force: true}));
};