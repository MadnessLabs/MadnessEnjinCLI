const runSequence = require('run-sequence').use(gulp);
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const path = require('path');
const template = require('gulp-template');
const jeditor = require("gulp-json-editor");

const cleanString = require('../../services/cleanString');
const removeFolder = require('../../services/removeFolder');

module.exports = function(gulp, callback) {
    var boilerplatePath = global.enjin.path + '/app/boilerplates/' + global.enjin.stack + '/';
    // Move everything from src to app
    gulp.src('./src/**/*.*')
        .pipe(gulp.dest('./app'))
        .on('end', function() {
            // Remove directories
            removeFolder('./src');
            removeFolder('./templates');
            // Rename jade files to pug
            gulp.src('./app/jade/**/*.jade')
                .pipe(rename(function(path) {
                    path.extname = ".pug";
                }))
                .pipe(gulp.dest('app/pug'))
                .on('end', function() {
                    removeFolder('./app/jade');
                });
            // Move library to js
            gulp.src('./app/ts/library/**/*.js')
                .pipe(gulp.dest('app/js'))
                .on('end', function() {
                    removeFolder('./app/ts/library');
                });
            // Move controllers to page
            gulp.src('./app/ts/controller/**/*.ts')
                .pipe(gulp.dest('app/ts/page'))
                .on('end', function() {
                    gulp.src('app/ts/controller/**/*.ts', {read: false})
                        .pipe(clean({force: true}));
                });
            // Update to new package file
            gulp.src(boilerplatePath + 'package.json')
                .pipe(jeditor(function(json) {
                    json.name = cleanString(appName).toLowerCase();
                    json.author = {
                        name: appAuthor.name,
                        url: appAuthor.url,
                        email: appAuthor.email
                    };
                    json.scripts.postinstall = 'gulp reinstall';
                    json.url = appUrl;
                    json.description = appDesc;
                    return json; 
                }))
                .pipe(gulp.dest('./'));
            // Update enjin file
            gulp.src('./enjin.json')
                .pipe(jeditor(function(json) {
                    json.stack = 'madnessionic';
                    if (json.js.build.indexOf('build/js/page/**/*.js') === -1) {
                        json.js.build.push('build/js/page/**/*.js');
                    }
                    var buildLibs = json.js.build.indexOf('src/ts/library/**/*.js');
                    if (buildLibs) {
                        json.js.build[buildLibs] = 'app/js/**/*.js';
                    }
                    return json; 
                }))
                .pipe(gulp.dest('./'));
            callback();
        });
};