import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

// Configuración del proyecto principal (clinica-de-la-costa)
const mainFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Configuración del proyecto secundario (imedic-a44f2)
const imedicFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_APP_ID,
};

// Inicialización de la aplicación principal
let mainApp;
if (!getApps().find(app => app.name === "[DEFAULT]")) {
  mainApp = initializeApp(mainFirebaseConfig);
} else {
  mainApp = getApp();
}

// Inicialización de la aplicación imedic
let imedicApp;
if (!getApps().find(app => app.name === "imedic")) {
  imedicApp = initializeApp(imedicFirebaseConfig, "imedic");
} else {
  imedicApp = getApp("imedic");
}

// Obtención de instancias de Firestore, Auth, Storage para el proyecto principal
export const db = getFirestore(mainApp);
export const auth = getAuth(mainApp);
export const storage = getStorage(mainApp);

// Obtención de instancias de Firestore, Auth, Storage para el proyecto imedic
export const imedicDb = getFirestore(imedicApp);
export const imedicAuth = getAuth(imedicApp);
export const imedicStorage = getStorage(imedicApp);

// App Check SOLO en el cliente para el proyecto principal
export let appCheck;
if (typeof window !== 'undefined') {
  appCheck = initializeAppCheck(mainApp, {
    provider: new ReCaptchaEnterpriseProvider(
      process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY
    ),
    isTokenAutoRefreshEnabled: true
  });
}

// App Check para imedic (si es necesario)
export let imedicAppCheck;
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_IMEDIC_RECAPTCHA_ENTERPRISE_SITE_KEY) {
  imedicAppCheck = initializeAppCheck(imedicApp, {
    provider: new ReCaptchaEnterpriseProvider(
      process.env.NEXT_PUBLIC_IMEDIC_RECAPTCHA_ENTERPRISE_SITE_KEY
    ),
    isTokenAutoRefreshEnabled: true
  });
}