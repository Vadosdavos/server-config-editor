/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    tokenCookieMaxAge: process.env.TOKEN_COOKIE_MAX_AGE
      ? parseInt(process.env.TOKEN_COOKIE_MAX_AGE, 10)
      : 60000,
  },
  env: {
    NEXTAUTH_SECRET: 'bb9b24526f3de2b132bb9972a687ecf1',
    MONGODB_URI: 'mongodb://Admin:Opm31i9x240@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin',
  },
}

module.exports = nextConfig
