#!/usr/bin/env node
const functionsMD = require("./functions.js");
const fs = require("fs");

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
          "Enter an option:".blue +
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

module.exports = { mdLinks };
