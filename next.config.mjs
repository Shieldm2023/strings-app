/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname: '/**', // Matches any path
            },
            {
                protocol: 'https',
                hostname: 'cloudflare-ipfs.com',
                pathname: '/**', // Matches any path
            },
            {
                protocol: 'https',
                hostname: 'r2kjtvtb5kf1xhjs.public.blob.vercel-storage.com',
                pathname: '/**', // Matches any path
            },
        ],
    },
};

export default nextConfig;
