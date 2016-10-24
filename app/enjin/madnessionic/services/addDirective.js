const rename   = require('gulp-rename');
const template = require('gulp-template');
const npc      = require('copy-paste');

module.exports = function(name, attrs, templatePath, restrict) {
    var attrsJson = {};
    var attrProps = [];
    var attrName; 
    var attrBinding = '=';

    restrict = !restrict ? "'EA'": "'" + restrict + "'";
    templatePath = !templatePath ? '' : `\n\t\ttemplateUrl: 'html/directive/${name}.html', \t\t`;

    if (attrs) {
        if (attrs.indexOf(',') > 0) {
            attrs = attrs.split(',');
            for(var i = 0; i < attrs.length; i++) {
                attrBinding = '=';
                var attr = attrs[i];
                attrName = attr;

                if (attr.indexOf(':') > 0) {
                    var attrSplit = attr.split(':');
                    attrName = attrSplit[0];
                    attrBinding = attrSplit[1];
                }

                attrsJson[attrName] = attrBinding;
                attrProps.push(`${attrName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}="''"`);
            }
        } else {
            attrName = attrs;
            if (attrs.indexOf('=') > 0) {
                var attrSplit = attr.split('=');
                attrName = attrSplit[0];
                attrBinding = attrSplit[1];
            }

            attrsJson[attrName] = attrBinding;
            attrProps.push(`${attrName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}="''"`);
        }

        var attrsJsonString = JSON.stringify(attrsJson);

        var copyText = `${name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}(\n\t${attrProps.join('\n\t')}\n)`;

        npc.copy(copyText);
    } else {
        attrsJsonString = '{}';
    }

    gulp.src(tmplDir+'ts/directive.ts')
        .pipe(template({
            app: appName,
            name: name,
            attrs: attrsJsonString.replace(/"/g, "'").replace(/,/g, `,\n\t\t\t`).replace("{'", "{\n\t\t\t'").replace("'}", "'\n\t\t}"),
            template: templatePath,
            restrict: restrict
        }))
        .pipe(rename(name+'.ts'))
        .pipe(gulp.dest(jsSrcDir+'directive/'));
};