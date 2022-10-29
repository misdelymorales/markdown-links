#!/usr/bin/env node
const {
  isDirectory,
  getAbsolutePath,
  pathExist,
  mdFile,
  readingFileExtractMD,
  linksExtractor,
  validateLinks,
} = require("./functions.js");
const path = require("node:path");
const saveRoute = process.argv[2];

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    //si la ruta no existe
    const baseRoute = path.resolve(route);
    console.log("pathExist", pathExist(baseRoute));
    if (!pathExist(baseRoute)) {
      reject("La ruta no es válida".error);
    }

    //guardamos rutas absolutas
    const isAbsolute = getAbsolutePath(route);

    let filesAbsolute = [];
    //si la ruta existe
    if (pathExist(isAbsolute) && isDirectory(route)) {
      console.log("Tu ruta es un directorio".warn);
      //Extraemos archivos de directorio
      extractFilesMD = readingFileExtractMD(route);
    } else {
      //La ruta es archivo .md
      if (mdFile(route)) {
        console.log("Tu ruta es un archivo .md".warn);
        filesAbsolute = [route];
        linksExtractor(filesAbsolute);
      } else {
        //Si la ruta no es archivo .md
        reject(`La ruta ${route} es inválida`.error);
      }
    }

    //Extraer Links
    const links = linksExtractor(filesAbsolute);

    //Se extrae data de los links
    const dataLinksValidate = validateLinks(links);
    Promise.allSettled(dataLinksValidate)

      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    if (options === undefined) {
      resolve(links);
    } else if (options === "--validate") {
      resolve(dataLinksValidate);
    } else if (options === "--stats") {
      resolve(`Existen ${links.length} links en total`.help);
    }
  });
};

mdLinks(saveRoute)
  .then((resolve) => {
    console.log(resolve);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = { mdLinks };
