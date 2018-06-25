import { exec } from "child_process";
import * as rimraf from "rimraf";

import { cleanString } from "./cleanString";
import { cloneRepo } from "./cloneRepo";
import { appInstall } from "./appInstall";
import { openEditor } from "./openEditor";
import { updatePackage } from "./updatePackage";
import { expandGitLink } from "./expandGitLink";

/**
 * Clone a repo, run npm install, and optionally, you can open your favorite editor or link to a repo as origin
 * @param stack The stack or repo to use as a bolierplate for your new app
 * @param name The name of your new app (This will be used )
 * @param editor The code editor to open after app is installed
 * @param repo The Git repo to link as origin
 */
export async function appStart(
  stack: string,
  name: string,
  editor?: "code" | "code-insiders" | "subl" | "atom",
  repo?: string
) {
  let repoLink: string;

  if (!stack) {
    throw new Error("Stack name or repo link is required!");
  }

  if (!name) {
    throw new Error("App name is required to start your new project!");
  }

  if (repo) {
    repoLink = expandGitLink(repo);
  }

  const newAppName = cleanString(name);
  const appDir = process.cwd() + "/" + newAppName;

  cloneRepo(stack, newAppName, error => {
    if (error) {
      throw new Error(error);
    }

    rimraf(`${appDir}/.git`, delError => {
      if (delError) {
        throw new Error(delError);
      }
      exec(`git init`, { cwd: appDir }, initError => {
        if (initError) {
          console.error("Failed to remove .git origin remote!");
        } else if (repoLink) {
          exec(
            `git remote add origin ${repoLink}`,
            { cwd: appDir },
            remoteError => {
              if (remoteError) {
                console.error(`Failed to add ${repoLink} origin remote!`);
              } else {
                console.log(`Added ${repoLink} as origin remote...`);
              }
            }
          );
        }
      });
    });

    updatePackage({ name: newAppName.toLowerCase() }, false, appDir);

    appInstall(appDir, stdout => {
      console.log(stdout);
      console.log("Your app has been installed successfully! ^_^");
      if (editor) {
        console.log("Now opening project in your selected editor...");
        openEditor(editor, appDir);
      }

      return {
        stdout
      };
    });
  });
}
