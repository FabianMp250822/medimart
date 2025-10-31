import { adminDb } from './firebase-admin';
import { Firestore } from 'firebase-admin/firestore';

/**
 * Safely get the admin database instance
 * Throws an error if adminDb is not initialized
 */
export function getAdminDb(): Firestore {
  if (!adminDb) {
    throw new Error('Firebase Admin is not initialized. Check your service account credentials.');
  }
  return adminDb;
}

/**
 * Execute a query safely with error handling
 */
export async function safeQuery<T>(
  queryFn: (db: Firestore) => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    const db = getAdminDb();
    return await queryFn(db);
  } catch (error) {
    console.error('Firebase query error:', error);
    return fallback;
  }
}
