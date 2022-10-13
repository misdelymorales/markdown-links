#!/usr/bin/env node
//importar modulos
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const colors = require("colors");
colors.setTheme({
  silly: "rainbow",
  prompt: "grey",
  ok: ["green", "bold", "underline"],
  help: "cyan",
  warn: ["yellow", "bold"],
  debug: "blue",
  error: ["red", "underline"],
}); //console.log('test'.custom); console.log("this is an error".error);

// //Verificar si la ruta existe
// const routeExist = (inputPath) => fs.existsSync(inputPath);
// //Verificar si es directorio
// const isFolder = (inputPath) => fs.lstatSync(inputPath).isDirectory();
// //Leer directorio
// const readFolder = (directory) => fs.readdirSync(directory, "utf8");
// //Filtrar archivos .md
// const filesMD = (file) => path.extname(file) === ".md";
// //Leer archivo .md
// const readFile = (file) => fs.readFileSync(file, "utf8");

const extractLinks = (filename) => {
  const data = fs.readFileSync(filename, "utf8");
  const dataHtml = marked.parse(data); //usando marcado para transformar md a html
  const $ = cheerio.load(dataHtml); //usando cheerio para recorrer el archivo para extraer etiquetas <a>
  const linksObjects = $("a"); //

  const linksObjArr = [];
  linksObjects.each((index, link) => {
    linksObjArr.push({
      href: $(link).attr("href"),
      text: $(link).text(),
      file: filename,
    });
  });

  return linksObjArr;
};
