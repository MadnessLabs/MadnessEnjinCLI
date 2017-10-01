const fs = require('fs-extra');
const path = require("path");

const renderToFile = require('../renderToFile');


module.exports = function(data, config = {}, callback = false) {
    var outputDir = `${config && config.srcDir ? config.srcDir : 'src'}/components/${data.name}`;
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
                            if (callback && typeof callback === 'function') {
                                callback();
                            }
                        }
                    );
                }
            );
        }
    });
};