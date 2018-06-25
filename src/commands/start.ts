import { argv } from "yargs";

import { appStart } from "../services/appStart";

module.exports = function(enjinDir) {
  const stack = process.argv[3];
  const name = process.argv[4];
  const editor = argv.editor ? argv.editor : argv.e;
  const repo = argv.repo ? argv.repo : argv.r;

  appStart(stack, name, editor, repo);
};
