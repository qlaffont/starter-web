/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// INFO : IN CASE OF NEED TO LOAD ESM
// const removeImports = require('next-remove-imports')();
// const nextConfig = removeImports({
//   swcMinify: true,
//   experimental: { esmExternals: true },
// });

const nextConfig = {
  swcMinify: true,
  experimental: { esmExternals: true },
};

module.exports = nextConfig;
