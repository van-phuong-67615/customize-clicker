import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only: allow ngrok tunnel to access Next.js HMR
  // This setting is ignored in production builds
  allowedDevOrigins: ["6c03-115-76-55-223.ngrok-free.app"],
};

export default nextConfig;

