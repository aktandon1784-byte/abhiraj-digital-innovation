import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Safety net: if a request for the www host ever reaches the app (the
  // www.abhirajdigitalinnovation.com/* Worker route sends it here), answer with a
  // single permanent 308 to the same path on the canonical non-www host.
  // Query strings are carried over automatically. This is a no-op if Cloudflare
  // already redirects www before the Worker runs.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.abhirajdigitalinnovation.com" }],
        destination: "https://abhirajdigitalinnovation.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
