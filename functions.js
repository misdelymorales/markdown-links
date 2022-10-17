#!/usr/bin/env node
//importar modulos
const fs = require("fs");
const path = require("path");
const fetch = require("cross-fecth");
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

const linksInfo = (filesMd) => {
  let links = [];
  filesMd.forEach((files) => {
    const reguExpress =
      /\[(.+)\]\((https?:\/\/[^\s]+)(?: '(.+)')?\)|(https?:\/\/[^\s]+)/gi;
    const reguText = /\[([^\]]+)]/g;
    const reguUrl =
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
    const lineText = fs.readFileSync(files, { encoding: "utf8" });
    const matchLinks = lineText.match(reguExpress);
    if (matchLinks !== null) {
      matchLinks.forEach((info) => {
        links.push({
          text:
            info.match(reguText) !== null
              ? info.match(reguText).toString().slice(1, -1)
              : "Texto no encontrado",
          href: info.match(reguUrl).toString(),
          file: files,
        });
      });
    } else {
      console.log("No se puede encontrar ningún enlace".error);
    }
  });
  return links;
};

module.exports = {
  isDirectory,
  getAbsolutePath,
  pathExist,
  readDir,
  mdFile,
  linksInfo,
};
