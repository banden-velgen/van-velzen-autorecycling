/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,
  // Disable server-side data fetching during build
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

export default nextConfig
