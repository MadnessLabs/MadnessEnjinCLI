import { exec } from "child_process";

/**
 * Opens code editor in a desired folder
 * @param editor The code editor program you want to open
 * @param folderPath The folder you want the code editor to open in
 */
export function openEditor(
  editor: "code" | "code-insiders" | "subl" | "atom",
  folderPath: string
) {
  exec(`${editor} .`, { cwd: folderPath }, error => {
    if (error) {
      console.log("Failed to open code editor!");
      throw new Error(error.message);
    }
  });
}
