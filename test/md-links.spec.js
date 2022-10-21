const mdLinks = require("../index.js");
const {
  isDirectory,
  getAbsolutePath,
  pathExist,
  //readDir,
  mdFile,
  validateLinks,
  readingFileExtractMD,
  linksExtractor,
} = require("../functions");

const routeError = "./readme.m";
const path = "./readme.md";
const pathBreak = "pruebas/carp_prueba/break.md";
const routeRelative = "./pruebas";
const folder = "./pruebas/carp_prueba";
const pathDiferent = "./package.json";
const pathPrueba = "./pruebas./test.md";
const path1 = "./pruebas/carp_prueba/vacio.md";
const routeRelative2 = "./test";
const links = [
  {
    file: "./pruebas./test.md",
    href: "https://es.wikipedia.org/wiki/Markdown)",
  },
  { file: "./pruebas./test.md", href: "https://nodejs.org/)" },
];

const arrLinks = [
  {
    href: "https://jestjs.io/docs/es-ES/getting-started",
    text: "Empezando con Jest - Documentación oficial",
    file: "pruebas/carp_prueba/break.md",
    status: 200,
    statusText: "ok",
  },
  {
    href: "https://jestjs.io/docs/es-ES/asynchronous",
    text: "Tests de código asincrónico con Jest - Documentación oficial",
    file: "pruebas/carp_prueba/break.md",
    status: 200,
    statusText: "ok",
  },
];

// Función pathExist
describe("La función pathExist verifica si la ruta existe.", () => {
  it("Debería retornar una función.", () => {
    expect(typeof pathExist).toBe("function");
  });
  it("Deberia retornar true si la ruta existe.", () => {
    expect(pathExist(path)).toBe(true);
  });
  it("Deberia retornar false si la ruta no existe.", () => {
    expect(pathExist(routeError)).toBe(false);
  });
});

//Función getAbsolutePath
describe("La función igetAbsolutePath verifica si la ruta es absoluta.", () => {
  it("Debería retornar una función.", () => {
    expect(typeof getAbsolutePath).toBe("function");
  });
  it("Deberia retornar true si la ruta es absoluta.", () => {
    const result = getAbsolutePath(path);
    expect(result).toBeTruthy();
  });
  it("Deberia retornar false si la ruta no es absoluta.", () => {
    const result = pathExist(routeError);
    expect(result).toBeFalsy();
  });
});

//Función isDirectory
describe("La función isDirectory verifica si la ruta es directorio.", () => {
  it("Debería retornar una función.", () => {
    expect(typeof isDirectory).toBe("function");
  });
  it("Deberia retornar true si la ruta es directorio.", () => {
    const result = isDirectory(folder);
    expect(result).toBeTruthy();
  });
  it("Deberia retornar false si la ruta no es directorio.", () => {
    const result = isDirectory(path);
    expect(result).toBeFalsy();
  });
});

//Función mdFile
describe("La función mdFile verifica si el archivo tiene la extensión .md", () => {
  it("Debería retornar una función.", () => {
    expect(typeof mdFile).toBe("function");
  });
  it("Deberia retornar true si el archivo es .md", () => {
    expect(mdFile(path)).toBe(true);
  });
  it("Deberia retornar false si el archivo es diferente a .md", () => {
    expect(pathExist(routeError)).toBe(false);
  });
});

//Función readingFileExtractMD
describe("La función readingFileExtractMD extrae los arcivos .md de un directorio", () => {
  it("Debería retornar una función", () => {
    expect(typeof readingFileExtractMD).toBe("function");
  });
  it("Debería retornar un arreglo", () => {
    let arrayFiles = readingFileExtractMD(routeRelative);
    expect(arrayFiles[1]).toEqual("test.md");
  });
  it("Debería retornar un array vacio si el directorio no tiene archivos.md", () => {
    expect(extractionFilesMD(routeRelative2)).toEqual([]);
  });
});

//Función linksExtractor
describe("extrae Links", () => {
  it("archivo esta vacio", () => {
    expect(linksExtractor([path1])).toEqual([]);
  });
  it("archivo no contiene links", () => {
    expect(linksExtractor([path1])).toEqual([]);
  });
  it("Si existen links deberia retornar un array con href y file.", () => {
    expect(linksExtractor([pathPrueba])).toEqual(arrLinks);
  });
});

//Función validateLinks
describe("La función validateLinks valida los links en ok/fail y su status.", () => {
  it("Debería retornar una función.", () => {
    expect(typeof validateLinks).toBe("function");
  });
  test("Deberia retornar un array con la validación de los links.", async () => {
    const data = await linksExtractor(links);
    expect(data).toStrictEqual(arrLinks);
  });
});

//Función mdLinks
describe("mdLinks", () => {
  it("Debería retornar una función.", () => {
    expect(typeof mdLinks).toBe("function");
  });
  test('Debería retornar "La ruta ingresada no es válida." si la ruta es inválida', async () => {
    await expect(mdLinks(routeError, undefined)).rejects.toMatch(
      "La ruta ingresada no es válida."
    );
  });
  test('Debería retornar "La ruta  no corresponde a un archivo Markdown" si la ruta no es archivo.md.', async () => {
    await expect(mdLinks(pathDiferent, undefined)).rejects.toMatch(
      "La ruta ./package.json no corresponde a un archivo Markdown."
    );
  });
  test("Debería retornar el total de los links encontrados", async () => {
    const data = await mdLinks(routeRelative, "--stats");
    expect(data).toStrictEqual("Existen 4 links en total.");
  });
  test("Debería retornar los links con las propiedades href y file.", async () => {
    const data = await mdLinks(pathPrueba, undefined);
    expect(data).toStrictEqual(links);
  });
  test("Debería retornar los links con todas sus propiedades.", async () => {
    const data = await mdLinks(pathPrueba, "--validate");
    expect(data).toStrictEqual(arrLinks);
  });
  test("Debería retornar el total de los links encontrados.", async () => {
    const data = await mdLinks(pathPrueba, "--stats");
    expect(data).toStrictEqual("Existen 3 links en total.");
  });
});
