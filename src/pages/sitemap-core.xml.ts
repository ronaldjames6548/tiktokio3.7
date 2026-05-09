// src/pages/sitemap-core.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const locales = ['', 'ar', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ko', 'ms', 'nl', 'pt', 'ru', 'tl', 'tr', 'vi'];
  
  // Core pages with priority & changefreq config
  const corePages = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/tiktok-downloader/', priority: 0.9, changefreq: 'weekly' },
    { path: '/tiktok-video-downloader/', priority: 0.9, changefreq: 'weekly' },
    { path: '/tiktok-photo-downloader/', priority: 0.8, changefreq: 'weekly' },
    { path: '/tiktok-thumbnail-downloader/', priority: 0.7, changefreq: 'monthly' },
    { path: '/download-tiktok-video/', priority: 0.8, changefreq: 'weekly' },
    { path: '/musical-down-tiktok-downloader/', priority: 0.7, changefreq: 'monthly' },
    { path: '/savefrom-download-from-tiktok/', priority: 0.7, changefreq: 'monthly' },
    { path: '/savetik-download-tiktok-video-without-watermark-free/', priority: 0.8, changefreq: 'weekly' },
    { path: '/savett-tiktok-downloader-save-tiktok-videos/', priority: 0.7, changefreq: 'monthly' },
    { path: '/snaptik-tiktok-downloader-download-video-tiktok-without-watermark/', priority: 0.7, changefreq: 'monthly' },
    { path: '/ssstiktok-download-tiktok-videos-without-watermark-free-tiktok-video-downloader/', priority: 0.7, changefreq: 'monthly' },
    { path: '/tikmate-tiktok-downloader-without-watermark-in-hd/', priority: 0.7, changefreq: 'monthly' },
    { path: '/tiksave-download-tiktok-video-without-watermark-with-tiktok-downloader/', priority: 0.7, changefreq: 'monthly' },
    { path: '/tiktoksss-tiktok-downloader-without-watermark/', priority: 0.7, changefreq: 'monthly' },
    { path: '/tmate-tiktok-downloader/', priority: 0.7, changefreq: 'monthly' },
    { path: '/ttdownloader-downloader-no-watermark-video-downloader-for-tiktok/', priority: 0.7, changefreq: 'monthly' },
    { path: '/about/', priority: 0.5, changefreq: 'yearly' },
    { path: '/contact/', priority: 0.5, changefreq: 'yearly' },
    { path: '/privacy-policy/', priority: 0.3, changefreq: 'yearly' },
    { path: '/terms-of-service/', priority: 0.3, changefreq: 'yearly' },
  ];

  const lastmod = new Date().toISOString();
  
  const urls = locales.flatMap(locale => 
    corePages.map(page => {
      const url = locale 
        ? `https://tiktokio.cam/${locale}${page.path}` 
        : `https://tiktokio.cam${page.path}`;
      return { url, priority: page.priority, changefreq: page.changefreq };
    })
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};