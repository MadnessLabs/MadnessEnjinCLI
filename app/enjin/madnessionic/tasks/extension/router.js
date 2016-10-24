const template = require('gulp-template');
const ts = require('gulp-typescript');
const gulpif = require('gulp-if');
const cache = require('gulp-cached');
const addsrc = require('gulp-add-src');
const plumber = require('gulp-plumber');


module.exports = function(gulp, callback) {
    var routes = [];
    var defaultRoute = false;

    for(var i=0; i < configJSON.extension.routes.length; i++){
        var route = configJSON.extension.routes[i];
        var stateName = route.state;
        delete route.state;
        if(!defaultRoute){
            defaultRoute = stateName;
        }
        routes.push(".state('"+stateName+"', "+ JSON.stringify(route).replace(/"/g, "'").replace(/,/g, ", \n") +")");
    }

    var tsResult = gulp.src(tmplDir+'ts/router.ts')
        .pipe(template({
            app: appName,
            routes: routes.join("\n\t\t\t\t"),
            defaultRoute: defaultRoute
        }))
        .pipe(gulpif(global.isWatching, plumber({
            errorHandler: function(error) {
                browserSync.notify(error.message, errorTimeout);
                this.emit('end');
            }
        })))
        .pipe(gulpif(global.isWatching,  cache('extension:js')))
        .pipe(addsrc('app/typings/index.d.ts'))
        .pipe(ts({
            "compilerOptions": {
                "target": "es5",
                "sourceMap": false
            }
        }));

        tsResult.dts.pipe(gulp.dest('extension/build'));
        tsResult.js.pipe(gulp.dest('extension/build')).on('end', function() {
            callback();
        });
};