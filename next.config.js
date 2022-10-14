/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require('next-remove-imports')();
const nextConfig = removeImports({
  swcMinify: true,
  experimental: { esmExternals: true },
});

module.exports = nextConfig;
