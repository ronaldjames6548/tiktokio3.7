// src/pages/sitemap-blog-index.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const locales = ['', 'ar', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ko', 'ms', 'nl', 'pt', 'ru', 'tl', 'tr', 'vi'];
  const lastmod = new Date().toISOString();
  
  // Blog index patterns
  const blogIndexPages = [
    { path: '/blog/', priority: 0.9, changefreq: 'daily' },
    { path: '/blog/category/[category]/', priority: 0.6, changefreq: 'weekly', dynamic: true },
    { path: '/blog/tag/[tag]/', priority: 0.6, changefreq: 'weekly', dynamic: true },
    // Note: Pagination pages (/blog/2/, etc.) are typically excluded from sitemaps
  ];

  const urls = locales.flatMap(locale => 
    blogIndexPages
      .filter(page => !page.dynamic) // Exclude dynamic param pages from sitemap
      .map(page => {
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