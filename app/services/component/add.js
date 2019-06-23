const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require("path");
const argv = require('yargs').argv;

const getStencilConfig = require('../getStencilConfig');
const editStencilConfig = require('../editStencilConfig');
const camelize = require('../camelize');
const titleCase = require('../titleCase');
const capFirstLetter = require('../capFirstLetter');
const renderComponent = require('./render');


module.exports = function (name) {
    var namespace = argv.namespace ? argv.namespace : argv.n ? argv.n : true;
    var props = argv.props ? argv.props : argv.p ? argv.p : null;


    if (namespace && namespace !== true) {
        name = namespace + '-' + name;
    }

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

    const nameWithSpaces = name.replace(new RegExp('-', 'g'), ' ');

    var data = {
        name,
        title: titleCase(nameWithSpaces),
        className: capFirstLetter(camelize(nameWithSpaces)),
        props,
        content: `Your new ${name} component`
    };

    renderComponent(data, () => {
        console.log(`${name} component has been created successfully! ^_^`);
    });
};