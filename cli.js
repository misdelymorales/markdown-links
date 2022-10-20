#!/usr/bin/env node
const { mdLinks } = require("./index.js");

console.log("-------------------------------------------");
console.log("         Bienvenido a memb-mdlinks         ");
console.log("-------------------------------------------");

const userarg = process.argv;
const options = {
  validate: true,
  stats: false,
};

//process.argv[3];  (options.validate && !options.showStats)  y en consola seleccionar una de las 2 opciones
