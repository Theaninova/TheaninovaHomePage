/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')

const nextConfig = withBundleAnalyzer({enabled: process.env.ANALYZE === 'true'})({})

module.exports = nextConfig
