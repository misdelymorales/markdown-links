#!/usr/bin/env node
const functionsMD = require("./functions.js");
const fs = require("fs");
const path = require("path");
const saveRoute = process.argv[2];

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const isAbsolute = functionsMD.getAbsolutePath(path);
    if (functionsMD.pathExist(isAbsolute)) {
      console.log("La ruta es absoluta".debug);

      const saveFiles = functionsMD.readingFile(isAbsolute);
      const saveInfo = functionsMD.linksInfo(saveFiles);
      const status = functionsMD.linkStats(saveInfo);
      const valid = functionsMD.validateLinks(saveInfo);

      if (options.validate && !options.showStats) {
        resolve(valid);
      } else if (!options.validate && options.showStats) {
        resolve(status);
      } else {
        console.log(
          "Enter an option:".debug +
            "\n" +
            "--validate" +
            "\n" +
            "--stats" +
            "\n"
        );
      }
    } else {
      reject(new Error("Invalid path"));
    }
  });
};

mdLinks(saveRoute)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = { mdLinks };
