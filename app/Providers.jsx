"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Ajusta la ruta según tu estructura
import { SedeProvider } from "./context/SedeContext";


export default function Providers({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <SedeProvider>
        {children}
      </SedeProvider>
    </I18nextProvider>
  );
}
