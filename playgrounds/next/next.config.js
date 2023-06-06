/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@itwin/itwinui-react'],
};

module.exports = nextConfig;
