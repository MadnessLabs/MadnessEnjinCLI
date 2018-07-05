import * as fs from 'fs-extra';
import * as path from 'path';

import { renderToFile } from '../renderToFile';

/**
 * Render a component scss, tsx, and spec
 * @param data Info about the component being created
 * @param config Config object for the method
 * @param callback A callback to be run when render has completed
 */
export function renderComponent(
  data: any,
  config: any = {},
  callback: () => void
) {
  const outputDir = `${
    config && config.srcDir ? config.srcDir : 'src'
  }/components/${data.name}`;
  fs.exists(path.resolve(process.cwd(), outputDir), exists => {
    if (exists) {
      console.log(`${data.name} component already exists!`);
      return false;
    } else {
      renderToFile(
        '../templates/component.scss',
        data,
        `${outputDir}/${data.name}.scss`,
        () => {
          renderToFile(
            '../templates/component.tsx',
            data,
            `${outputDir}/${data.name}.tsx`,
            () => {
              renderToFile(
                '../templates/component.spec.ts',
                data,
                `${outputDir}/${data.name}.spec.ts`,
                () => {
                  if (callback && typeof callback === 'function') {
                    callback();
                  }
                }
              );
            }
          );
        }
      );
      return true;
    }
  });
}
