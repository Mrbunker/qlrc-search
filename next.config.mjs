/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    YAPI_TOKEN: process.env.YAPI_TOKEN,
    YAPI_UID: process.env.YAPI_UID,
    YAPI_HOST: process.env.YAPI_HOST,
  },
};

export default nextConfig;
