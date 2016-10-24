const clean    = require('gulp-clean');

const capFirstLetter = require('./capFirstLetter');

module.exports = function(name) {
    gulp.src([
        jsSrcDir+'service/'+capFirstLetter(name)+'.ts'
    ],{
        read: false
    })
    .pipe(clean({force: true}));
};