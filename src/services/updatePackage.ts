import * as fs from 'fs-extra';

const merge = require('./merge');


export default function (packageJSON, callback: any = false, packageDir = process.cwd()) {
  var packagePath = packageDir + '/package.json';
  fs.readJson(packagePath, (err, currentPackage) => {
    fs.outputJson(packagePath, merge(currentPackage, packageJSON), { spaces: 4 }, (err) => {
      if (err) {
        console.log('There was an error updating your package.json file!');
        return false
      }

      if (callback && typeof callback === 'function') {
        callback();
      }

      console.log('Package.json upadted!');
    });
  });
};