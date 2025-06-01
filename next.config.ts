import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  // Allow development server access from your local network
  allowedDevOrigins: ["192.168.1.20"],
};

export default nextConfig;
