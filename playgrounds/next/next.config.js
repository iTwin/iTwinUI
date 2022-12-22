/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withTM = require('next-transpile-modules')(['@itwin/itwinui-react']);

module.exports = withTM(nextConfig);
