/** @type {import('next').NextConfig} */

// module.exports = nextConfig;

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['52.187.55.33', 'webipdisk.blob.core.windows.net'],
  }
};

module.exports = withNextIntl(nextConfig);