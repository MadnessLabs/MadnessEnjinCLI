import { exec } from 'child_process';


export default function (editor, folderPath) {
  exec(`${editor} .`, { cwd: folderPath }, (error, stdout, stderr) => {
    if (error) {
      console.log('Failed to open code editor!');
      return false;
    }
  });
};