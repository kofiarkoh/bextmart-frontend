/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en", "jp", "fr", "it"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
