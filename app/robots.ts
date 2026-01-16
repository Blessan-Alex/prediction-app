import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/', // Usually good practice to disallow API routes
        },
        sitemap: 'https://settleupnow.vercel.app/sitemap.xml',
    };
}
