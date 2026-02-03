/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/static-shellhacks-2022',
    images: {
        unoptimized: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            use: ["@svgr/webpack"],
        });
        return config;
    },
};

module.exports = nextConfig;
