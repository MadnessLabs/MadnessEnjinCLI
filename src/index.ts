#! /usr/bin/env node

"use strict";
import * as path from "path";
import * as fs from "fs-extra";

const enjinDir = path.join(__dirname, "..");

if (process.argv.length > 2) {
  process.argv.forEach(function(val, index, array) {
    if (index === 2) {
      const modulePath = "app/commands/" + val;
      try {
        const command = require(enjinDir + "/" + modulePath);
        command(enjinDir);
      } catch (e) {
        if (
          typeof e === "object" &&
          e.message.indexOf("Cannot find module") >= 0
        ) {
          console.log("Sorry that command doesn't exist yet!");
        } else {
          console.log(e);
        }
      }
    }
  });
} else {
  const docs = fs.readFileSync(enjinDir + "/README.md", "utf8");
  console.log(docs);
}
