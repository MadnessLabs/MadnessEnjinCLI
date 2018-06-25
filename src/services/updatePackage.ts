import * as fs from "fs-extra";

import { merge } from "./merge";

/**
 * Update the content of a package.json file
 * @param packageJSON The JSON object to update package.json with
 * @param callback A function to run when it has finished updating package.json file
 * @param packageDir The directory where the pacakge.json lives
 */
export function updatePackage(
  packageJSON,
  callback: any = false,
  packageDir = process.cwd()
) {
  const packagePath = packageDir + "/package.json";
  fs.readJson(packagePath, (readError, currentPackage) => {
    if (readError) {
      throw new Error(readError.message);
    }
    fs.outputJson(
      packagePath,
      merge(currentPackage, packageJSON),
      { spaces: 4 },
      error => {
        if (error) {
          console.log("There was an error updating your package.json file!");
          throw new Error(error.message);
        }

        if (callback && typeof callback === "function") {
          callback();
        }

        console.log("Package.json upadted!");
      }
    );
  });
}
