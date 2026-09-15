/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@pipecraft/ui", "@pipecraft/tokens", "@pipecraft/charts"],
  reactStrictMode: true,
};

export default nextConfig;
