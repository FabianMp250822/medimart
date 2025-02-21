// app/ClientTranslationWrapper.jsx
"use client"; // Este componente se renderiza en el cliente

import { appWithTranslation } from 'next-i18next';

function ClientTranslationWrapper({ children }) {
  return <>{children}</>;
}

export default appWithTranslation(ClientTranslationWrapper);
