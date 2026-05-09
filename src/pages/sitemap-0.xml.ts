// src/pages/sitemap-0.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const locales = ['en', 'ar', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ko', 'ms', 'nl', 'pt', 'ru', 'tl', 'tr', 'vi'];
  const baseUrl = 'https://tiktokio.cam';
  const lastmod = new Date().toISOString();

  // All core pages (same structure across locales)
  const corePaths = [
    '/', '/tiktok-downloader/', '/tiktok-video-downloader/', '/tiktok-photo-downloader/',
    '/tiktok-thumbnail-downloader/', '/download-tiktok-video/', '/musical-down-tiktok-downloader/',
    '/savefrom-download-from-tiktok/', '/savetik-download-tiktok-video-without-watermark-free/',
    '/savett-tiktok-downloader-save-tiktok-videos/', '/snaptik-tiktok-downloader-download-video-tiktok-without-watermark/',
    '/ssstiktok-download-tiktok-videos-without-watermark-free-tiktok-video-downloader/',
    '/tikmate-tiktok-downloader-without-watermark-in-hd/',
    '/tiksave-download-tiktok-video-without-watermark-with-tiktok-downloader/',
    '/tiktoksss-tiktok-downloader-without-watermark/', '/tmate-tiktok-downloader/',
    '/ttdownloader-downloader-no-watermark-video-downloader-for-tiktok/',
    '/about/', '/contact/', '/privacy-policy/', '/terms-of-service/'
  ];

  // Fetch blog posts from all locales dynamically
  let blogPosts: Array<{ slug: string; localePrefix: string; updated: string }> = [];
  for (const locale of locales) {
    try {
      const posts = await getCollection('blog', ({ id }) => id.startsWith(`${locale}/`));
      posts.forEach(post => {
        blogPosts.push({
          slug: post.id.replace(`${locale}/`, ''),
          localePrefix: locale === 'en' ? '' : `/${locale}`,
          updated: post.data.updatedDate || post.data.pubDate || lastmod
        });
      });
    } catch {
      console.warn(`⚠️ Skipped blog collection for locale: ${locale}`);
    }
  }

  const urls: string[] = [];

  // 1️⃣ Add core pages for every locale
  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    for (const path of corePaths) {
      urls.push(`  <url>
    <loc>${baseUrl}${prefix}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`);
    }
  }

  // 2️⃣ Add blog posts for every locale
  for (const post of blogPosts) {
    urls.push(`  <url>
    <loc>${baseUrl}${post.localePrefix}/blog/${post.slug}/</loc>
    <lastmod>${post.updated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400', // Vercel edge caching
    },
  });
};