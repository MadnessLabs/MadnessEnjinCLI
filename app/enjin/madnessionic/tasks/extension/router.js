const template = require('gulp-template');


module.exports = function(gulp, callback) {
    var routes = [];
    var defaultRoute = false;

    for(var i=0; i < configJSON.extension.routes.length; i++){
        var route = configJSON.extension.routes[i];
        var stateName = route.state;
        //delete route.state;
        if(!defaultRoute){
            defaultRoute = stateName;
        }
        routes.push(route);
    }

    return gulp.src(tmplDir+'ts/router.ts')
        .pipe(template({
            app: appName,
            routes: routes,
            defaultRoute: defaultRoute,
            typings: false
        }))
        .pipe(gulp.dest('extension/build'));
};