import * as functions from 'firebase-functions/v2';
import { Request } from 'firebase-functions/v2/https';
import type { Response } from 'express';
import * as admin from 'firebase-admin';

// Inicializar Firebase Admin
admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();

/**
 * Cloud Function pública para obtener todos los usuarios que han aplicado
 * URL: https://REGION-PROJECT_ID.cloudfunctions.net/obtenerUsuariosContratados
 * 
 * Ejemplos de uso:
 * - Obtener todos: GET /obtenerUsuariosContratados
 * - Buscar por documento: GET /obtenerUsuariosContratados?numeroDocumento=123456789
 * - Filtrar por oferta: GET /obtenerUsuariosContratados?ofertaId=abc123
 * - Filtrar por estado: GET /obtenerUsuariosContratados?estado=Pendiente
 */
export const obtenerUsuariosContratados = functions.https.onRequest(async (req: Request, res: Response) => {
  // Configurar CORS para permitir acceso desde cualquier origen
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Solo permitir método GET
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido. Solo GET.' });
    return;
  }

  try {
    const { numeroDocumento, ofertaId, estado, limit = '100', offset = '0' } = req.query;

    const limitNum = parseInt(limit as string) || 100;
    const offsetNum = parseInt(offset as string) || 0;

    // Construir la query base
    let query: admin.firestore.Query = db.collection('postulaciones');

    // Aplicar filtros si existen (requiere índices)
    if (numeroDocumento) {
      query = query.where('informacionPersonal.numeroDocumento', '==', numeroDocumento);
    }

    if (ofertaId) {
      query = query.where('ofertaId', '==', ofertaId);
    }

    if (estado) {
      query = query.where('estado', '==', estado);
    }

    // Ordenar por fecha de postulación (más recientes primero)
    query = query.orderBy('fechaPostulacion', 'desc');

    // Aplicar paginación
    query = query.limit(limitNum).offset(offsetNum);

    // Ejecutar query
    const snapshot = await query.get();

    if (snapshot.empty) {
      res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'No se encontraron postulaciones.',
      });
      return;
    }

    // Procesar documentos
    const postulaciones = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();

        // Obtener URLs firmadas para los archivos de Storage
        let cvURLFirmada = data.cvURL;
        let certificadosURLsFirmadas = data.certificadosURLs || [];

        try {
          // Generar URL firmada para el CV (válida por 7 días)
          if (data.cvURL) {
            const cvPath = data.cvURL.split('/o/')[1]?.split('?')[0];
            if (cvPath) {
              const decodedPath = decodeURIComponent(cvPath);
              const cvFile = storage.bucket().file(decodedPath);
              const [signedUrl] = await cvFile.getSignedUrl({
                action: 'read',
                expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días
              });
              cvURLFirmada = signedUrl;
            }
          }

          // Generar URLs firmadas para los certificados
          if (data.certificadosURLs && data.certificadosURLs.length > 0) {
            certificadosURLsFirmadas = await Promise.all(
              data.certificadosURLs.map(async (url: string) => {
                try {
                  const certPath = url.split('/o/')[1]?.split('?')[0];
                  if (certPath) {
                    const decodedPath = decodeURIComponent(certPath);
                    const certFile = storage.bucket().file(decodedPath);
                    const [signedUrl] = await certFile.getSignedUrl({
                      action: 'read',
                      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
                    });
                    return signedUrl;
                  }
                  return url;
                } catch (error) {
                  console.error('Error generando URL firmada para certificado:', error);
                  return url;
                }
              })
            );
          }
        } catch (error) {
          console.error('Error generando URLs firmadas:', error);
        }

        return {
          id: doc.id,
          ...data,
          cvURL: cvURLFirmada,
          certificadosURLs: certificadosURLsFirmadas,
          fechaPostulacion: data.fechaPostulacion?.toDate?.() || data.fechaPostulacion,
        };
      })
    );

    // Obtener el total de documentos con los mismos filtros
    let countQuery: admin.firestore.Query = db.collection('postulaciones');
    if (numeroDocumento) {
      countQuery = countQuery.where('informacionPersonal.numeroDocumento', '==', numeroDocumento);
    }
    if (ofertaId) {
      countQuery = countQuery.where('ofertaId', '==', ofertaId);
    }
    if (estado) {
      countQuery = countQuery.where('estado', '==', estado);
    }
    const totalSnapshot = await countQuery.count().get();
    const total = totalSnapshot.data().count;

    res.status(200).json({
      success: true,
      count: postulaciones.length,
      total: total,
      limit: limitNum,
      offset: offsetNum,
      data: postulaciones,
    });
  } catch (error: any) {
    console.error('Error obteniendo postulaciones:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
});

/**
 * Cloud Function para obtener una postulación específica por número de documento
 * URL: https://REGION-PROJECT_ID.cloudfunctions.net/obtenerPostulacionPorDocumento?numeroDocumento=123456789
 */
export const obtenerPostulacionPorDocumento = functions.https.onRequest(async (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido. Solo GET.' });
    return;
  }

  const { numeroDocumento } = req.query;

  if (!numeroDocumento) {
    res.status(400).json({
      success: false,
      error: 'Parámetro numeroDocumento es requerido',
    });
    return;
  }

  try {
    // Buscar con índice compuesto
    const snapshot = await db
      .collection('postulaciones')
      .where('informacionPersonal.numeroDocumento', '==', numeroDocumento)
      .orderBy('fechaPostulacion', 'desc')
      .get();

    if (snapshot.empty) {
      res.status(404).json({
        success: false,
        message: `No se encontró postulación con documento ${numeroDocumento}`,
      });
      return;
    }

    const postulaciones = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        
        // Generar URLs firmadas
        let cvURLFirmada = data.cvURL;
        let certificadosURLsFirmadas = data.certificadosURLs || [];

        try {
          if (data.cvURL) {
            const cvPath = data.cvURL.split('/o/')[1]?.split('?')[0];
            if (cvPath) {
              const decodedPath = decodeURIComponent(cvPath);
              const cvFile = storage.bucket().file(decodedPath);
              const [signedUrl] = await cvFile.getSignedUrl({
                action: 'read',
                expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
              });
              cvURLFirmada = signedUrl;
            }
          }

          if (data.certificadosURLs && data.certificadosURLs.length > 0) {
            certificadosURLsFirmadas = await Promise.all(
              data.certificadosURLs.map(async (url: string) => {
                try {
                  const certPath = url.split('/o/')[1]?.split('?')[0];
                  if (certPath) {
                    const decodedPath = decodeURIComponent(certPath);
                    const certFile = storage.bucket().file(decodedPath);
                    const [signedUrl] = await certFile.getSignedUrl({
                      action: 'read',
                      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
                    });
                    return signedUrl;
                  }
                  return url;
                } catch (error) {
                  return url;
                }
              })
            );
          }
        } catch (error) {
          console.error('Error generando URLs firmadas:', error);
        }

        return {
          id: doc.id,
          ...data,
          cvURL: cvURLFirmada,
          certificadosURLs: certificadosURLsFirmadas,
          fechaPostulacion: data.fechaPostulacion?.toDate?.() || data.fechaPostulacion,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: postulaciones.length,
      data: postulaciones,
    });
  } catch (error: any) {
    console.error('Error obteniendo postulación:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
});

/**
 * Cloud Function para obtener estadísticas de postulaciones
 * URL: https://REGION-PROJECT_ID.cloudfunctions.net/estadisticasPostulaciones
 */
export const estadisticasPostulaciones = functions.https.onRequest(async (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido. Solo GET.' });
    return;
  }

  try {
    const postulacionesSnapshot = await db.collection('postulaciones').get();
    
    const stats = {
      total: postulacionesSnapshot.size,
      porEstado: {} as Record<string, number>,
      porOferta: {} as Record<string, number>,
      recientes: 0, // Últimos 30 días
    };

    const hace30Dias = new Date();
    hace30Dias.setDate(hace30Dias.getDate() - 30);

    postulacionesSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      
      // Contar por estado
      const estado = data.estado || 'Sin Estado';
      stats.porEstado[estado] = (stats.porEstado[estado] || 0) + 1;

      // Contar por oferta
      const ofertaTitulo = data.ofertaTitulo || 'Postulación Espontánea';
      stats.porOferta[ofertaTitulo] = (stats.porOferta[ofertaTitulo] || 0) + 1;

      // Contar recientes
      const fechaPostulacion = data.fechaPostulacion?.toDate?.();
      if (fechaPostulacion && fechaPostulacion >= hace30Dias) {
        stats.recientes++;
      }
    });

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
});
