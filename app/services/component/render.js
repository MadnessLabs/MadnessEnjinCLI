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
                '../templates/component.css',
                data,
                `${outputDir}/${data.name}.css`,
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
                                    renderToFile(
                                        '../templates/component.e2e.ts',
                                        data,
                                        `${outputDir}/${data.name}.e2e.ts`,
                                        (e2eFile) => {
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
            );
        }
    });
};