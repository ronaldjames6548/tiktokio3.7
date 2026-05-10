// src/pages/sitemap-blog-index.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const lastmod = new Date().toISOString();
  
  const locales = ['', 'ar', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ko', 'ms', 'nl', 'pt', 'ru', 'tl', 'tr', 'vi'];

  const blogPages = [
    { path: '/blog/', priority: '0.9', changefreq: 'daily' },
    // Add more static blog pages here if needed in future
  ];

  const urls = locales.flatMap(locale => 
    blogPages.map(page => {
      const base = locale ? `https://tiktokio.cam/${locale}` : 'https://tiktokio.cam';
      return {
        url: `${base}${page.path}`,
        priority: page.priority,
        changefreq: page.changefreq,
      };
    })
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(page => `  <url>
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