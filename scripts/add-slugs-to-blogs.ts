/**
 * Script para agregar slugs a todas las noticias existentes en Firebase
 * 
 * Ejecutar con: npx tsx scripts/add-slugs-to-blogs.ts
 */

import * as admin from 'firebase-admin';
import { generateSlug } from '../src/types/blog';

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

async function addSlugsToBlogs() {
  try {
    console.log('🔄 Obteniendo noticias de Firebase...');
    
    const blogsSnapshot = await db.collection('blogs').get();
    
    console.log(`📊 Encontradas ${blogsSnapshot.size} noticias`);
    
    let updated = 0;
    let skipped = 0;
    
    const batch = db.batch();
    
    for (const doc of blogsSnapshot.docs) {
      const data = doc.data();
      
      // Si ya tiene slug, saltar
      if (data.slug) {
        skipped++;
        console.log(`⏭️  Saltando "${data.title}" - ya tiene slug: ${data.slug}`);
        continue;
      }
      
      // Generar slug desde el título
      const slug = generateSlug(data.title);
      
      console.log(`✅ Actualizando "${data.title}"`);
      console.log(`   Slug: ${slug}`);
      
      batch.update(doc.ref, { slug });
      updated++;
    }
    
    if (updated > 0) {
      console.log('\n💾 Guardando cambios en Firebase...');
      await batch.commit();
      console.log(`✅ ${updated} noticias actualizadas exitosamente`);
    }
    
    if (skipped > 0) {
      console.log(`⏭️  ${skipped} noticias saltadas (ya tenían slug)`);
    }
    
    console.log('\n🎉 Proceso completado!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

// Ejecutar script
addSlugsToBlogs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
