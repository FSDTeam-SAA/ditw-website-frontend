/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "dynamic3zabeer.scaleupdevagency.com",
        protocol: "https",
      },
      // {
      //   hostname: "1744970141_logo.jpg",
      //   protocol: "https"
      // }
    ],
  },
};

export default nextConfig;
