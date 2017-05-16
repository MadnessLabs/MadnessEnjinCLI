module.exports = function(gulp, callback) {
    var bsOpts = {
        port: configJSON.port ? configJSON.port : 3000,
        files: ['index.html', '**/*.js'],
        reloadDebounce: 1000,
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: appName,
        notify: true
    };
    if (configJSON.proxy) {
        bsOpts.proxy = configJSON.proxy;
        bsOpts.open = 'external';
        bsOpts.host = configJSON.proxy;
    } else {
        bsOpts.server = {
            baseDir: appDir
        };
    }
    if (configJSON.browser) {
        bsOpts.browser = configJSON.browser;
    }
    browserSync.init(bsOpts);
    global.synced = true;
    callback();
};