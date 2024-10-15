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
                hostname: 'dhzu9iazkoiza1a2.public.blob.vercel-storage.com',
                pathname: '/**', // Matches any path
            },
        ],
    },
};

export default nextConfig;
