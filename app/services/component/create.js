const fs = require('fs-extra');
const path = require("path");

const renderToFile = require('../../services/renderToFile');
const camelize = require('../../services/camelize');
const capFirstLetter = require('../../services/capFirstLetter');
var stencilConfigPath = '../../../components/config.json';
var stencilConfig = require(stencilConfigPath);

module.exports = function (name, props = [], callback = false) {
    if (name.indexOf('-') <= 0) {
        if (callback && typeof callback === 'function') {
            callback({error: true, message: 'Component name must contain a "-" to be valid!'});
        }
        return false;
    }

    name = name.toLowerCase();

    var data = {
        name,
        className: capFirstLetter(camelize(name.replace('-', ' '))),
        props
    };

    var outputDir = `../../components/src/components/${name}`;

    fs.exists(path.resolve(__dirname, `../${outputDir}`), (exists) => {
        if (exists) {
            if (callback && typeof callback === 'function') {
                callback({error: true, message: `${name} component already exists!`});
            }
            return false;
        } else {
            renderToFile(
                '../../components/template/component.scss',
                data,
                `${outputDir}/${name}.scss`,
                (scssFile) => {
                    renderToFile(
                        '../../components/template/component.tsx',
                        data,
                        `${outputDir}/${name}.tsx`,
                        (tsxFile) => {
                            stencilConfig.bundles[0].components.push(name);
                            fs.writeFile(path.resolve(__dirname, stencilConfigPath), JSON.stringify(stencilConfig, null, 4), function (err) {
                                if (err) {
                                    if (callback && typeof callback === 'function') {
                                        callback({error: true, message: 'Couldn\'t edit StencilJS Config...'});
                                    }
                                    return false;
                                }
                            
                                if (callback && typeof callback === 'function') {
                                    callback({scssFile, tsxFile, data});
                                }
                            });
                        }
                    );
                }
            );
        }
    });

    return true;
};