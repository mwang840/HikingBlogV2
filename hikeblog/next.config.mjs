/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "avatars.githubusercontent.com" },
            { hostname: "www.nps.gov" },
        ],
    },
};

export default nextConfig;
