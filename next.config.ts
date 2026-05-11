import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Output as standalone for containerized deploys (Docker, AWS ECS, etc.)
  // Remove or comment out if deploying to Vercel/Netlify.
  output: process.env.STANDALONE === "true" ? "standalone" : undefined,

  // Disable x-powered-by header for security
  poweredByHeader: false,
}

export default nextConfig

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
