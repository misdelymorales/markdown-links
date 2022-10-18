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
const readDir = (routeDir) => fs.readdirSync(routeDir);

//comprobar si es un archivo md
const mdFile = (route) => {
  const ext = path.extname(route);
  return ext === ".md"
    ? true
    : console.log("La ruta no es un archivo md".error);
};

//Leer archivos
const readingFile = (thePath) => {
  const info = fs.statSync(thePath);
  let arrFiles = [];

  if (isDirectory(thePath)) {
    const fileDir = readDir(thePath).map((file) => path.join(thePath, file));
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
    console.log("No se encuentra ruta".error);
  }

  const listArray = arrFiles.filter(mdFile);
  return listArray;
};

//Obtener links
const linksInfo = (filesMd) => {
  let links = [];
  filesMd.forEach((files) => {
    const regExpress =
      /\[(.+)\]\((https?:\/\/[^\s]+)(?: '(.+)')?\)|(https?:\/\/[^\s]+)/gi;
    const regText = /\[([^\]]+)/g;
    const regUrl =
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
    const lineText = fs.readFileSync(files, { encoding: "utf8" });
    const matchLinks = lineText.match(regExpress);
    if (matchLinks !== null) {
      matchLinks.forEach((info) => {
        links.push({
          text:
            info.match(regText) !== null
              ? info.match(regText).toString().slice(1, -1)
              : "Texto no encontrado",
          href: info.match(regUrl).toString(),
          file: files,
        });
      });
    } else {
      console.log("No se puede encontrar ningún enlace".error);
    }
  });
  return links;
};

//validar links
const validateLinks = (arrayLinks) => {
  const status = arrayLinks.map((obj) =>
    fetch(obj.href)
      .then((res) => {
        if (res.status <= 399) {
          return {
            text: obj.text,
            href: obj.href,
            file: obj.file,
            status: res.status,
            statusText: "Ok",
          };
        } else {
          return {
            text: obj.text,
            href: obj.href,
            file: obj.file,
            status: res.status,
            statusText: "Fail",
          };
        }
      })
      .catch((err) => ({
        text: obj.text,
        href: obj.href,
        file: obj.file,
        status: 404,
        statusText: "Fail, not found",
      }))
  );
  return Promise.all(status);
};

const linkStats = (array) => {
  let status = [];
  const linkTotal = array.length;
  const urls = array.map((element) => element.href);
  const uniqueLinks = new Set(urls).size;

  const linkStats = { total: linkTotal, unique: uniqueLinks };

  status.push(linkStats);
  return status;
};

module.exports = {
  isDirectory,
  getAbsolutePath,
  pathExist,
  readDir,
  mdFile,
  linksInfo,
  validateLinks,
  linkStats,
  readingFile,
};
