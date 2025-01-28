/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Activa el modo estricto de React (opcional)
    images: {
      domains: ['www.clinicadelacosta.com'], // Agrega el dominio permitido aquí
    },
  };
  
  module.exports = nextConfig;
  