/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/bizare-lineage',
                destination: '/',
                permanent: true,
            },
            {
                source: '/bizzare-lineage',
                destination: '/',
                permanent: true,
            },
            {
                source: '/bizare-lineage-tier-list',
                destination: '/tier-list',
                permanent: true,
            },
            {
                source: '/bizzare-lineage-tier-list',
                destination: '/tier-list',
                permanent: true,
            },
            {
                source: '/stands/gold-experience',
                destination: '/stands/golden-experience',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
