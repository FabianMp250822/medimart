import admin from 'firebase-admin';

const serviceAccountKey = process.env.FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const projectId = process.env.FIREBASE_PROJECT_ID;

// Solo intentar inicializar si las variables de entorno existen
if (serviceAccountKey && clientEmail && projectId && !admin.apps.length) {
  try {
    const serviceAccount: admin.ServiceAccount = {
      projectId,
      clientEmail,
      privateKey: serviceAccountKey.replace(/\\n/g, '\n'),
    };
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error: any) {
    console.error('Firebase Admin initialization error:', error.stack);
  }
}

const adminDb = admin.apps.length ? admin.firestore() : null;
const adminAuth = admin.apps.length ? admin.auth() : null;

export { adminDb, adminAuth };
