const template = require('gulp-template');


module.exports = function(gulp, callback) {
    var defaultRoute = appEntry;

    for (var i=0; i < appRoutes.length; i++) {
        var route = appRoutes[i];
        if (!defaultRoute) {
            defaultRoute = route.state;
        }
    }

    return gulp.src(tmplDir+'ts/router.ts')
        .pipe(template({
            app: appName,
            routes: appRoutes,
            defaultRoute: defaultRoute
        }))
        .pipe(gulp.dest(jsSrcDir));
};