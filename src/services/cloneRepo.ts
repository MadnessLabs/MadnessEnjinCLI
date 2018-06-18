import { exec } from 'child_process';

const expandGitLink = require('./expandGitLink');


export default function cloneRepo(enjinDir: string, stack: string, folderPath: string, callback: any) {
  stack = expandGitLink(stack);
  folderPath = folderPath ? folderPath : stack.split('/')[stack.split('/').length - 1];

  console.log('Cloning ' + stack + ' into ' + folderPath + ' ...');
  exec(`git clone ${stack} ${folderPath}`, callback);
};