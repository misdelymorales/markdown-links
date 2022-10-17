#!/usr/bin/env node
const functionsMD = require("./functions.js");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const isAbsolute = functionsMD.getAbsolutePath(path);
    if (functionsMD.pathExist(functionsMD.getAbsolutePath)) {
      console.log("La ruta es absoluta".debug);
    }

    const readingFile = (thePath) => {
      const info = fs.statSync(thePath);
      let arrFiles = [];

      if (isDirectory(thePath)) {
        const fileDir = readDir(thePath).map((file) =>
          path.join(thePath, file)
        );
        fileDir.forEach((file) => {
          if (fs.statSync(file).isFile()) {
            arrFiles.push(file);
          } else {
            const repeat = readingFile(file);
            let arrFiles = arrFiles.concat(repeat);
          }
        });
      } else if (info.isFile()) {
        arrFiles.push(thePath.toString());
      } else {
        console.log("Undetermined path".error);
      }

      const listArray = arrFiles.filter(isMdFile);
      return listArray;
    };
  });
};

console.log(mdLinks);
