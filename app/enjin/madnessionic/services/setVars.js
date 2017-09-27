const merge = require('./merge');
const fs    = require('fs');

module.exports = function(callback) {
    console.log('Setting Variables from enjin.json...');
    
    if (environment) {
        envFile = `enjin.${environment}.json`;
    } else {
        envFile = 'enjin.local.json';
    }
    try {
        env = JSON.parse(fs.readFileSync(envFile));
    } catch(e) {
        env = {};
    }
    configFile   = 'enjin.json';
    enjinJSON    = JSON.parse(fs.readFileSync(configFile));
    configJSON   = merge(enjinJSON, env);
    // ENJIN
    if (configJSON.extension && !configJSON.extension.routes) {
        configJSON.extension.routes = configJSON.routes;
    }
    global.enjin.stack = configJSON.stack;
    // APP
    appName      = configJSON.name;
    appDebug     = configJSON.debug;
    appDesc      = configJSON.description;
    appDir       = configJSON.root;
    appIcon      = configJSON.img.favicon;
    appLocal     = configJSON.local;
    appMobile    = configJSON.mobile;
    appEntry     = configJSON.defaultRoute || false;
    appRoutes    = configJSON.routes;
    appUrl       = configJSON.url;
    appVersion   = configJSON.version;
    appAuthor    = configJSON.author;
    appBuild     = 'build/';
    appPlugins   = configJSON.plugins;
    // CSS
    cssSrcDir    = configJSON.css.srcDir;
    cssDestDir   = appDir+configJSON.css.dir;
    cssDestFile  = configJSON.css.file;
    cssBuild     = configJSON.css.build;
    cssBuildDir  = appBuild+"css/";
    cssBuildLib  = 'library.scss';
    cssLib       = configJSON.css.libraries;
    cssLint      = 'scss-lint.yml';
    cssWatch     = configJSON.css.watch;
    // ERROR
    errorCount   = 0;
    errorTimeout = 10000;
    // FONT
    fontDir      = appDir+configJSON.font.dir;
    fontWatch    = configJSON.font.watch;
    // HTML
    htmlDir      = appDir+configJSON.html.dir;
    htmlFile     = configJSON.html.file;
    htmlSrcDir   = configJSON.html.srcDir;
    htmlSrcFile  = configJSON.html.srcFile;
    htmlWatch    = configJSON.html.watch;
    htmlTemplate = htmlSrcDir + htmlSrcFile;
    // IMG
    iconDir      = 'icon/';
    imgDir       = appDir+configJSON.img.dir;
    imgIconDir   = imgDir+iconDir;
    imgWatch     = configJSON.img.watch;
    // JS
    jsSrcDir     = configJSON.js.srcDir;
    jsDestDir    = appDir+configJSON.js.dir;
    jsDestFile   = configJSON.js.file;
    jsBuild      = configJSON.js.build;
    jsBuildDir   = appBuild+"js/";
    jsBuildLib   = 'library.js';
    jsLib        = configJSON.js.libraries;
    jsWatch      = configJSON.js.watch;
    // TEMPLATES
    tmplDir      =  global.enjin.path  + '/app/enjin/' + global.enjin.stack + '/templates/';
    workboxConfig = configJSON.workboxjs;
    workboxDest = configJSON.workboxjsDest;
    workboxPatterns = configJSON.workboxjsPatterns;
    workboxIgnores = configJSON.workboxjsIgnores;
    // STENCILJS
    stenciljsConfig = configJSON.stenciljs;

    if (callback && typeof callback === "function") {
        callback();
    }
};