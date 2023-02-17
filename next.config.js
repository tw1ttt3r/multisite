/** @type {import('next').NextConfig} */

const domains = [ process.env.NEXT_PUBLIC_SOURCE.split("https://")[1] ]

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains
  }
}

module.exports = nextConfig
