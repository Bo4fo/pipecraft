/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow verification builds to run without overwriting a live dev server's output.
  distDir: process.env.PIPECRAFT_BUILD_DIR || ".next",
  transpilePackages: ["@pipecraft/ui", "@pipecraft/tokens", "@pipecraft/charts"],
  onDemandEntries: {
    // Keep visited dashboard pages compiled while moving between sidebar items.
    maxInactiveAge: 10 * 60 * 1000,
    pagesBufferLength: 16,
  },
  reactStrictMode: true,
};

export default nextConfig;
