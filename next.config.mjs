/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images:{
        domains:['res.cloudinary.com', 'lh3.googleusercontent.com', 'gravatar.com', 'cdn.pixabay.com']
    }
};

export default nextConfig;
