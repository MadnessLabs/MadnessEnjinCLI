const template = require('gulp-template');


module.exports = function(gulp, callback) {
    var routes = [];
    var defaultRoute = appEntry;

    for(var i=0; i < appRoutes.length; i++){
        var route = appRoutes[i];
        var stateName = route.state;
        delete route.state;
        if(!defaultRoute){
            defaultRoute = stateName;
        }
        routes.push(".state('"+stateName+"', "+ JSON.stringify(route).replace(/"/g, "'").replace(/,/g, ", \n") +")");
    }

    return gulp.src(tmplDir+'ts/router.ts')
        .pipe(template({
            app: appName,
            routes: routes.join("\n\t\t\t\t"),
            defaultRoute: defaultRoute
        }))
        .pipe(gulp.dest(jsSrcDir));
};