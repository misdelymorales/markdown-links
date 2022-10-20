#!/usr/bin/env node
const { mdLinks } = require("./index.js");
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

const [, , , ...args] = process.argv;
console.log("-------------------------------------------");
console.log("         Bienvenido a memb-mdlinks         ");
console.log("-------------------------------------------");

// Validación de parámetros por terminal
