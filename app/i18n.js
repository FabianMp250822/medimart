"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import nextI18nextConfig from "@/next-i18next.config";

// Importamos la config de next-i18next

const { i18n: i18nConfig } = nextI18nextConfig || {};

if (!i18n.isInitialized) {
  i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: i18nConfig?.locales || ["es", "en"],
      fallbackLng: i18nConfig?.defaultLocale || "es",
      ns: ["common"],
      defaultNS: "common",
      debug: process.env.NODE_ENV === "development",
      detection: {
        order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator"],
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
