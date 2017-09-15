module.exports = function(gulp, callback) {
    configJSON.browserSync = configJSON.browserSync ? configJSON.browserSync : {};
    var bsOpts = {
        port: configJSON.browserSync.port ? configJSON.browserSync.port : configJSON.port ? configJSON.port : 3000,
        files: configJSON.browserSync.files ? configJSON.browserSync.files : ['index.html', '**/*.js'],
        reloadDebounce: configJSON.browserSync.reloadDebounce ? configJSON.browserSync.reloadDebounce : 1000,
        injectChanges: configJSON.browserSync.injectChanges ? configJSON.browserSync.injectChanges : true,
        logFileChanges: configJSON.browserSync.logFileChanges ? configJSON.browserSync.logFileChanges : true,
        logLevel: configJSON.browserSync.logLevel ? configJSON.browserSync.logLevel : 'info',
        logPrefix: configJSON.browserSync.logPrefix ? configJSON.browserSync.logPrefix : appName,
        notify: configJSON.browserSync.notify ? configJSON.browserSync.notify : true,
        open: global.skipBrowserOpen ? false : configJSON.browserSync.open ? configJSON.browserSync.open : true,
        browser: configJSON.browserSync.browser ? configJSON.browserSync.browser : configJSON.browser ? configJSON.browser : 'default'
    };
    if (configJSON.proxy || configJSON.browserSync.proxy) {
        bsOpts.proxy = configJSON.browserSync.proxy ? configJSON.browserSync.proxy : configJSON.proxy;
        bsOpts.open = 'external';
        bsOpts.host = configJSON.browserSync.proxy ? configJSON.browserSync.proxy : configJSON.proxy;
    } else {
        bsOpts.server = {
            baseDir: appDir
        };
    }

    browserSync.init(bsOpts);
    global.synced = true;
    callback();
};