const rename   = require('gulp-rename');
const template = require('gulp-template');

const capFirstLetter = require('./capFirstLetter');
const addController  = require('./addController');
const addRoute       = require('./addRoute');


module.exports = function(name) {
    gulp.src(tmplDir+'pug/page.pug')
        .pipe(template({
            name: name
        }))
        .pipe(rename(name+'.pug'))
        .pipe(gulp.dest(htmlSrcDir+'page/'));
    gulp.src(tmplDir+'scss/page.scss')
        .pipe(template({
            name: name
        }))
        .pipe(rename(name+'.scss'))
        .pipe(gulp.dest(cssSrcDir+'page/'));
    addController(name, 'page');
    addRoute(name, '/'+name, 'html/page/'+name+'.html', capFirstLetter(name)+'Controller');
};