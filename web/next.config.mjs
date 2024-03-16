/* @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.english.elpais.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
