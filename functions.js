#!/usr/bin/env node
//importar modulos
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const colors = require("colors");
colors.setTheme({
  silly: "rainbow",
  prompt: "grey",
  ok: ["green", "bold", "underline"],
  help: "cyan",
  warn: ["yellow", "bold"],
  debug: "blue",
  error: ["red", "underline"],
});

//Comprobar si ruta existe
const pathExist = (route) => fs.existsSync(route);

//Comprobar si la ruta es absoluta, si es relativa convertirla en absoluta
const getAbsolutePath = (route) => {
  return path.isAbsolute(route) ? route : path.resolve(route);
};

//Comprobar si es directorio
const isDirectory = (route) => fs.statSync(route).isDirectory(); //El método fs.statSync() se utiliza para devolver información sobre la ruta del archivo dada de forma síncrona.

//Leer directorio
const readDir = (routeDir) => fs.readdirSync(routeDir, "utf-8");

//comprobar si es un archivo md
const mdFile = (file) => path.extname(file) === ".md";

//Obtener archivos con extensión .md
const readFile = (file) => fs.readFileSync(file, "utf8");

// expresión regular para hacer la comparación y extracción de links
const regExp =
  /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

// función que lee directorio y retorna los archivos.md
const readingFileExtractMD = (routeDir) => {
  const dataDirectory = readDir(routeDir);
  let arrFiles = dataDirectory.filter((element) => {
    if (mdFile(element)) {
      return element;
    }
  });
  return arrFiles;
};

//Extraer links de archivos .md
const linksExtractor = (filesMd) => {
  let allLinks = [];
  filesMd.forEach((file) => {
    const dataFiles = readFile(file);
    //extraer links con expresión regular
    if (regExp.test(dataFiles)) {
      let arLinks = dataFiles.match(regExp);
      console.log(
        `En ${file} existen ${arLinks.length} links para analizar`.help
      );
      arLinks.forEach((arrayLinks) => {
        allLinks.push({
          file: file,
          href: arrayLinks,
        });
      });
    } else {
      console.log(`En ${file} no existen links para analizar`.error);
    }
  });
  return allLinks;
};

// //validar links
const validateLinks = (links) => {
  const status = links.map((e) => {
    return fetch(e)
      .then((res) => {
        return {
          text: e.text,
          href: e.href,
          file: e.file,
          status: res.status,
          statusText: "Ok".ok,
        };
      })
      .catch((error) => {
        return {
          text: e.text,
          href: e.href,
          file: e.file,
          status:
            error.status === undefined ? "No existe status" : error.status,
          statusText: "Fail".error,
        };
      });
  });

  return Promise.all(status);
};

module.exports = {
  isDirectory,
  getAbsolutePath,
  pathExist,
  readDir,
  mdFile,
  readingFileExtractMD,
  linksExtractor,
  validateLinks,
};
