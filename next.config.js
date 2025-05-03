/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.clinicadelacosta.com"],
  },
  // Aquí inyectamos la configuración de i18n
  i18n,
};

module.exports = nextConfig;
