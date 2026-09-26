/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
        pathname: "/free-photo/**",
      },
    ],
  },
};

export default nextConfig;
