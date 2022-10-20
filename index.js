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
const fs = require("fs");
const fetch = require("node-fetch");
const saveRoute = process.argv[3];

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    //si la ruta no existe
    if (!pathExist(route)) {
      reject("La ruta no es válida".error);
    }

    //guardamos rutas absolutas
    const isAbsolute = getAbsolutePath(route);
    const filesAbsolute = [];

    if (pathExist(isAbsolute)) {
      if (isDirectory(route)) {
        console.log("Tu ruta es un directorio".warn);
        //Extraemos archivos de directorio
        extractFilesMD = readingFileExtractMD(route);
      } else {
        //La ruta es archivo .md
        if (mdFile(route)) {
          console.log("Tu ruta es un archivo .md".warn);
          filesAbsolute = [route];
        }
      }
      //Si la ruta no es archivo .md
    } else rej(`La ruta ${route} es inválida`.error);

    //Extraer Links
    const links = linksExtractor(filesAbsolute);

    //Se extrae data de los links
    const dataLinksValidate = validateLinks(links);

    if (options === undefined) {
      res(links);
    } else if (options === "--validate") {
      res(dataLinksValidate);
    } else if (options === "--stats") {
      res(`Existen ${links.length} links en total`.help);
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
