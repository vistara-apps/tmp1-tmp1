
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['imagedelivery.net', 'res.cloudinary.com'],
  },
};

export default nextConfig;
