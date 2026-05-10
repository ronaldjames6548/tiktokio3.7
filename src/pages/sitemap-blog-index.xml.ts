// src/pages/sitemap-blog-index.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const lastmod = new Date().toISOString();

  const allPosts = await getCollection('blog');

  const urls: Array<{ url: string; lastmod: string }> = [];

  for (const post of allPosts) {
    // post.id is like: "ar/best-online-earning-games-in-pakistan-that-are-trending-on-tiktok.md"
    const parts = post.id.split('/');
    const postLocale = parts.length > 1 ? parts[0] : 'en';           // e.g. "ar", "de", etc.
    const slugWithExt = parts[parts.length - 1];
    const slug = slugWithExt.replace(/\.md$/, '');                   // remove .md

    // Generate URL for this post in its correct language
    const base = postLocale === 'en' || postLocale === ''
      ? 'https://tiktokio.cam/blog'
      : `https://tiktokio.cam/${postLocale}/blog`;

    urls.push({
      url: `${base}/${slug}/`,
      lastmod: post.data.lastmod || lastmod,
    });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};