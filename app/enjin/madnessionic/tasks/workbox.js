const wbBuild = require('workbox-build');


module.exports = function(gulp, callback) {
    return wbBuild.generateSW(configJSON.workboxjs ? configJSON.workboxjs : {
        globDirectory: appDir,
        swDest: workboxDest ? workboxDest : appDir + 'sw.js',
        globPatterns: workboxPatterns ? workboxPatterns : ['**\/*.{html,js,css}'],
        globIgnores: workboxIgnores ? workboxIgnores : [],
        maximumFileSizeToCacheInBytes: 3000000
      })
      .then(() => {
        console.log('Service worker generated.');
      })
      .catch((err) => {
        console.log('[ERROR] This happened: ' + err);
      });
};