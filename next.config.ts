import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    unoptimized: true, 
    domains: ['fakestoreapi.com'], 
  },
  output: 'export'

};

export default nextConfig;
