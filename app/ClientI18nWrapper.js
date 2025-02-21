"use client";

import { i18n } from "@/next-i18next.config";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";


export default function ClientI18nWrapper({ children, lng }) {
  useEffect(() => {
    if (!i18n.isInitialized) return;
    i18n.changeLanguage(lng);
  }, [lng]);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
