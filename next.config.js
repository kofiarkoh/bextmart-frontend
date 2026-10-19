/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en", "jp", "fr", "it"],
    defaultLocale: "en",
  },
  async headers() {
    return [
      {
        // HTML pages and data routes: always revalidate so a deploy shows up immediately.
        // /_next/static (content-hashed) and /_next/image keep Next's own caching.
        source: "/((?!_next/static|_next/image|assets|locales|favicon).*)",
        headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig
