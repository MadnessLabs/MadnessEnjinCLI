const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require("path");

const editStencilConfig = require('../editStencilConfig');
const renderToFile = require('../renderToFile');
const camelize = require('../camelize');
const capFirstLetter = require('../capFirstLetter');


module.exports = function(name, props) {
    if (name.indexOf('-') <= 0) {
        console.log('Name must contain a "-" to be a valid custom element!');
        return false;
    }

    name = name.toLowerCase();

    if (props) {
        if (props.indexOf(',') > 0) {
            props = props.split(',');
        } else {
            props = [props];
        }
    }

    var data = {
        name,
        className: capFirstLetter(camelize(name.replace('-', ' '))),
        props
    };

    var stencilPath = process.cwd() + '/stencil.config.js';
    fs.exists(stencilPath, function(exists) {
        if (exists) {
            var stenciljs = require(stencilPath);
            stenciljs.config.bundles[0].components.push(name);

            var outputDir = `${stenciljs.config.srcDir ? stenciljs.config.srcDir : 'src'}/components/${name}`;
        
            fs.exists(path.resolve(process.cwd(), outputDir), (exists) => {
                if (exists) {
                    console.log(`${name} component already exists!`);
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
                                    editStencilConfig(stencilPath, stenciljs.config, () => {
                                        console.log('Component has been created successfully! ^_^');
                                    });
                                }
                            );
                        }
                    );
                }
            });
        } else {
            console.log('To create a component stencil.config.js is required!');
        }
    });
};