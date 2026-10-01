/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    outputFileTracingRoot: __dirname,
    images: {
        remotePatterns: [(() => {
            const url = new URL(process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v3');
            return { protocol: url.protocol.slice(0, -1), hostname: url.hostname, pathname: '/uploads/**' };
        })()],
    },
};

module.exports = nextConfig;
