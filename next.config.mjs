/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn-icons-png.flaticon.com'],
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',
          permanent: true, // Set to true for a 301 redirect
        },
      ];
    },
  };
  
  export default nextConfig;
  