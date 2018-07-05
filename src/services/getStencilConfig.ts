import * as fs from 'fs-extra';

/**
 * Get the Stencil.js config file as JSON
 * @param callback A callback to run when finished getting Stencil config
 * @param context The folder to run command relative to
 */
export function getStencilConfig(
  callback: (stencilConfig: any, enjinPath: string) => void,
  context: string = process.cwd()
) {
  try {
    const enjinPath = context + '/enjin.json';
    const enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
    if (!enjinJSON.stenciljs) {
      throw new Error('No stenciljs config in your enjin.json file!');
    }

    if (callback && typeof callback === 'function') {
      callback(enjinJSON.stenciljs, enjinPath);
    }
  } catch (e) {
    console.log(
      'No enjin.json file found in the current directory, trying stencil.config.js...'
    );
    const stencilPath = context + '/stencil.config.js';
    fs.exists(stencilPath, function(stencilExists) {
      if (stencilExists) {
        const stenciljs = require(stencilPath);
        if (callback && typeof callback === 'function') {
          callback(stenciljs.config, stencilPath);
        }
      }
    });
  }
}
