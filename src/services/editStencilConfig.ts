import * as fs from 'fs-extra';

/**
 * Edit Stencil config file
 * @param filePath The path to the stencil config file
 * @param configJSON The configJSON to configure edit
 * @param callback A function to run when edit is complete
 */
export function editStencilConfig(
  filePath: string,
  configJSON: any,
  callback: () => void
) {
  if (filePath.indexOf('enjin') >= 0) {
    const enjinJSON = require(filePath);
    enjinJSON.stenciljs = configJSON;
    fs.writeJson(filePath, enjinJSON, err => {
      if (err) {
        console.log("Couldn't write enjin.json!");
        return false;
      }
      if (callback && typeof callback === 'function') {
        callback();
      }
      return true;
    });
  } else {
    fs.readFile(filePath, 'utf8', (readError, data) => {
      if (readError) {
        console.log("Couldn't read stencil.config.js!");
        return false;
      }

      const newStencilJS = data.replace(
        /bundles ?: ?[^,]*/,
        'bundles: ' + JSON.stringify(configJSON.bundles, null, 2)
      );
      fs.writeFile(filePath, newStencilJS, error => {
        if (error) {
          console.log("Couldn't write stencil.config.js!");
          return false;
        }
        if (callback && typeof callback === 'function') {
          callback();
        }
        return true;
      });
      return true;
    });
  }
}
