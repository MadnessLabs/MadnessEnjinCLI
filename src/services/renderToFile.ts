import * as _ from 'lodash';
import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Render a lodash template to a file
 * @param templatePath Path of the tempalte being rendered
 * @param data The template data to use when generating the file
 * @param outputPath The place to put the generated file
 * @param callback A function that runs when the render completes
 * @param context The file directory context for this command
 */
export function renderToFile(
  templatePath: string,
  data: any,
  outputPath: string,
  callback: (renderedTemplate: string) => void,
  context: string = process.cwd()
) {
  fs.readFile(
    path.resolve(__dirname, templatePath),
    'UTF-8',
    (_err, templateFile) => {
      const renderedTemplate = _.template(templateFile)(data);
      fs.outputFile(
        path.resolve(context, outputPath),
        renderedTemplate,
        err => {
          if (err) {
            return err;
          } else {
            if (callback && typeof callback === 'function') {
              callback(renderedTemplate);
            }
            return renderedTemplate;
          }
        }
      );
    }
  );
}
