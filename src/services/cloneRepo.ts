import { exec } from "child_process";

import { expandGitLink } from "./expandGitLink";

/**
 * Clones a git repository into the desired folder and runs a callback on completion
 * @param stack The stack or Git repo to clone
 * @param folderPath The folder dir to clone into
 * @param callback A function to run when the clone is complete
 */
export function cloneRepo(
  stack: string,
  folderPath?: string,
  callback?: (error) => any
) {
  const stackRepo: string = expandGitLink(stack);
  const cloneToDir: string = folderPath
    ? folderPath
    : stackRepo.split("/")[stackRepo.split("/").length - 1].split(".git")[0];

  console.log(`Cloning ${stackRepo} into ${cloneToDir}...`);
  exec(`git clone ${stackRepo} ${cloneToDir}`, callback);
}
