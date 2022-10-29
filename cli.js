#!/usr/bin/env node
const { mdLinks } = require("./index.js");
const { brokenLinks } = require("./functions");
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

const [ , ,termPath, termValidate] = process.argv;

console.log("-------------------------------------------");
console.log("         Bienvenido a memb-mdlinks         ");
console.log("-------------------------------------------");

// Validación de parámetros por terminal
if (termPath && termValidate == undefined) {
    mdLinks(termPath)
    .then(resolve => {
        console.log(resolve);
    })
    .catch(reject => {
        console.log(color.bold.red(reject));
    })
}
else if (termPath && termValidate == '--validate') {
    mdLinks(termPath, termValidate)
        .then(resolve => {
            console.log(resolve);
        })
        .catch(reject => {
            console.log(color.bold.underline.red(reject));
        })
}
else if (termPath && termValidate == '--stats') {
    mdLinks(termPath, termValidate)
        .then(resolve => {
            console.log(gradient.cristal(resolve));
        })
        .catch(reject => {
            console.log(color.bold.underline.red(reject));
        })
}

else {
    console.log(color.bold.red('Error en los parámetros utilizados.'));

}
