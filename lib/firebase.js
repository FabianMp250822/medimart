import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check"; // Usamos ReCaptchaEnterpriseProvider

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
let appCheck;
let db;
let auth;
let storage;

// Inicializa Firebase y App Check SOLO en el cliente
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);

  // Usamos ReCaptchaEnterpriseProvider para App Check con reCAPTCHA Enterprise
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY),
    isTokenAutoRefreshEnabled: true // Habilitar la actualización automática del token
  });

  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
}

export { db, auth, storage, appCheck };
