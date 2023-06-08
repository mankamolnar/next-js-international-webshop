/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['default', 'en-EN', 'fr', 'nl-NL', 'hu-HU'],
    defaultLocale: 'default',
    localeDetection: false,
  }
}

module.exports = nextConfig
