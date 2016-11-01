const rename   = require('gulp-rename');
const template = require('gulp-template');

const capFirstLetter = require('./capFirstLetter');
const addController  = require('./addController');
const addRoute       = require('./addRoute');
const addResolver    = require('./addResolver');
const stateExists    = require('./stateExists'); 


module.exports = function(name, resolves) {
    if (stateExists(name)) {
        console.log(`${name} state already exists!`);
        return false;
    }

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
    addController(name, 'page', resolves);
    addRoute(
        name, 
        '/'+name, 
        'html/page/'+name+'.html', 
        capFirstLetter(name)+'Controller',
        resolves ? capFirstLetter(name)+'Resolver' : false
    );
    if (resolves) {
        addResolver(name, resolves);
    }
};