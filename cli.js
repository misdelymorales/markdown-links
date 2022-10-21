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

//const [, , , ...args] = process.argv;
// argv[0] = ruta de node
// argv[1] = ruta de mdLinks
// argv[2] = ruta del archivo
// argv[3] = --validate
// argv[4] = --stats

const argv = process.argv;

console.log("-------------------------------------------");
console.log("         Bienvenido a memb-mdlinks         ");
console.log("-------------------------------------------");


