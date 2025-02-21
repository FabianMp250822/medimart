import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true, // Opcional: para ver información en la consola
    detection: {
      // Configuración para detectar el idioma a partir de la cookie
      order: ['cookie', 'navigator'],
      caches: ['cookie'],
      cookieName: 'NEXT_LOCALE'
    },
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation }
    },
    interpolation: {
      escapeValue: false // React se encarga de la seguridad contra XSS
    }
  });

export default i18n;
