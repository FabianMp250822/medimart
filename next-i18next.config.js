const path = require("path");

module.exports = {
  i18n: {
    // Idioma por defecto
    defaultLocale: "es",
    // Idiomas que soportas
    locales: ["es", "en"],
    // Activa la detección de idioma según cabeceras u otras heurísticas
    // si usas i18next-browser-languagedetector en modo cliente
    localeDetection: false,
  },
  // Ruta donde se guardan los archivos de traducción
  localePath: path.resolve("./public/locales"),
};
