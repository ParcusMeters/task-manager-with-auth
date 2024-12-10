/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'standalone',
    async headers() {
        return [
            {
                // Apply these headers to all routes
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: '*',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
