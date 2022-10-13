#!/usr/bin/env node
//importar modulos
const fs = require("fs");
const path = require("path");
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

//Verificar si la ruta existe
const routeExist = (inputPath) => fs.existsSync(inputPath);
//Verificar si es directorio
const isFolder = (inputPath) => fs.lstatSync(inputPath).isDirectory();
//Leer directorio
const readFolder = (directory) => fs.readdirSync(directory, "utf8");
//Filtrar archivos .md
const filesMD = (file) => path.extname(file) === ".md";
//Leer archivo .md
const readFile = (file) => fs.readFileSync(file, "utf8");

//Expresión regular para comparar y extraer links
