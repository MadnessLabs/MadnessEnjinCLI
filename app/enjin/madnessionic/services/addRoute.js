const rename   = require('gulp-rename');
const template = require('gulp-template');
const runSequence  = require('run-sequence').use(gulp);
const jeditor      = require("gulp-json-editor");


module.exports = function(name, url, template, controller, view) {
    if (!view) {
        view = 'tab';
    }
    var newRoutes = appRoutes;
    var newState = {
        state: name,
        url: url
    };

    if (name.indexOf('.') > 0) {
        var stateSteps = name.split('.');
        for(var i = 0; i < newRoutes.length; i++) {
            var route = newRoutes[i];
            if (route.state == stateSteps[0] && !route.abstract) {
                route.abstract = true;
            }
            newRoutes[i] = route;
        }

        newState.views = {
            [view]: {
                templateUrl: template,
                controller: appName + '.' + controller + ' as ' + view
            }
        };
    } else {
        newState.templateUrl = template;
        newState.controller = appName + '.' + controller + ' as ctrl';
    }

    newRoutes.push(newState);
    gulp.src(configFile)
        .pipe(jeditor({
            'routes': newRoutes
        }))
        .pipe(gulp.dest("./"))
        .on('end', function(){
            runSequence('router', 'js:build', 'sync:reload');
        });
};