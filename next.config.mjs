/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Optional: If you want trailing slashes on your URLs (e.g., /services/)
    // trailingSlash: true, 
};

export default nextConfig;