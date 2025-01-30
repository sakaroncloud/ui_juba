/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost"
            }, {
                hostname: "api.jubahospitality.com"
            }
        ]
    },
};

export default nextConfig;
