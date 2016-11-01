const rename   = require('gulp-rename');
const template = require('gulp-template');
const npc      = require('copy-paste');

const addController  = require('./addController');
const addRoute       = require('./addRoute');
const capFirstLetter = require('./capFirstLetter');
const addResolver    = require('./addResolver');
const stateExists    = require('./stateExists');


module.exports = function(name, view, resolves) {
    if (stateExists(name)) {
        console.log(`${name} state already exists!`);
        return false;
    }

    if (!view) {
        view = 'tab';
    }

    gulp.src(tmplDir+'pug/state.pug')
        .pipe(template({name: name}))
        .pipe(rename(name+'.pug'))
        .pipe(gulp.dest(htmlSrcDir+'state/'));
    gulp.src(tmplDir+'scss/state.scss')
        .pipe(template({name: name}))
        .pipe(rename(name+'.scss'))
        .pipe(gulp.dest(cssSrcDir+'state/'));
    addController(name, 'state', resolves);
    var stateSteps = name.split(/(?=[A-Z])/);
    var state = stateSteps.join(".").toLowerCase();
    addRoute(
        state, 
        '/'+stateSteps[stateSteps.length - 1].toLowerCase(), 
        'html/state/'+name+'.html', 
        capFirstLetter(name)+'Controller', 
        resolves ? capFirstLetter(name)+'Resolver' : false, 
        view
    );
    if (resolves) {
        addResolver(name, resolves);
    }
    var copyText = `ui-view(name="${view}")`;

    npc.copy(copyText);
};