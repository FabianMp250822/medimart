// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Obtener el encabezado 'accept-language'
  const acceptLanguage = request.headers.get('accept-language');
  // Extraer el primer código de idioma (por ejemplo, "es" de "es-ES")
  const detectedLanguage = acceptLanguage
    ? acceptLanguage.split(',')[0].split('-')[0]
    : 'en'; // Valor por defecto si no se detecta

  // Verificar si ya existe una cookie con el idioma detectado
  const currentLanguage = request.cookies.get('NEXT_LOCALE');

  // Si la cookie no existe o el idioma ha cambiado, se establece la cookie
  const response = NextResponse.next();
  if (!currentLanguage || currentLanguage !== detectedLanguage) {
    response.cookies.set('NEXT_LOCALE', detectedLanguage, { path: '/' });
  }

  return response;
}
