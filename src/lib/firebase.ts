import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Client-side Firebase configuration for web app (Clinica de la Costa)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Client-side Firebase configuration for iMedic
const imedicFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_IMEDIC_FIREBASE_APP_ID,
};

// Helper function to initialize Firebase apps safely
function initializeFirebaseApp(config: any, name?: string): FirebaseApp {
    const apps = getApps();
    const appName = name || '[DEFAULT]';
    const existingApp = apps.find(app => app.name === appName);
    if (existingApp) {
        return existingApp;
    }
    return initializeApp(config, name);
}

// Initialize Firebase for Clinica de la Costa (default instance)
const app = initializeFirebaseApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Firebase for iMedic (secondary instance)
const imedicApp = initializeFirebaseApp(imedicFirebaseConfig, 'imedic');
const imedicAuth = getAuth(imedicApp);
const imedicDb = getFirestore(imedicApp);
const imedicStorage = getStorage(imedicApp);


export { 
    app, auth, db, storage,
    imedicApp, imedicAuth, imedicDb, imedicStorage 
};
