const fs = require("fs");
const path = require("node:path/posix");
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

const mdLinks = (filePath, options) => {
  if (fs.statSync(filePath).isDirectory()) {
    console.log(colors.help("Consulta los resultados de tu directorio:"));
    let arrFiles = [];

    const allFilesArr = getAllFiles(filePath);
    allFilesArr.map((file) => {
      if (path.extname(file) === ".md") {
        if (options.validate) {
          const validatingStatus = validateStatus(file);
          filesArr.push(validatingStatus);
        } else if (options.stats) {
          const readingAllFiles = statsLink(file);
          filesArr.push(readingAllFiles);
        } else {
          const readingExtrAllFiles = extractLinks(file);
          filesArr.push(readingExtrAllFiles);
        }
      }
    });
  }
};

console.log(mdLinks);
