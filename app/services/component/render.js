const fs = require('fs-extra');
const path = require("path");

const renderToFile = require('../renderToFile');


module.exports = function(data, callback = false) {
    var outputDir = `src/components/${data.name}`;
    fs.exists(path.resolve(process.cwd(), outputDir), (exists) => {
        if (exists) {
            console.log(`${data.name} component already exists!`);
            return false;
        } else {
            renderToFile(
                '../templates/component.scss',
                data,
                `${outputDir}/${data.name}.scss`,
                (scssFile) => {
                    renderToFile(
                        '../templates/component.tsx',
                        data,
                        `${outputDir}/${data.name}.tsx`,
                        (tsxFile) => {
                            renderToFile(
                                '../templates/component.spec.ts',
                                data,
                                `${outputDir}/${data.name}.spec.ts`,
                                (specFile) => {
                                    if (callback && typeof callback === 'function') {
                                        callback();
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    });
};