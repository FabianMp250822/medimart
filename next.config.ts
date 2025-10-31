
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Force clean rebuild - Updated: Oct 31, 2025
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'contenedor-de-video.firebasestorage.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config, { isServer }) => {
    // Excluir módulos problemáticos del bundle del cliente
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@opentelemetry/exporter-jaeger': false,
        '@genkit-ai/firebase': false,
      };
    }

    return config;
  },
  transpilePackages: [],
};

export default nextConfig;
