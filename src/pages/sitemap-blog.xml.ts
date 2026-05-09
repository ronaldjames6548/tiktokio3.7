// src/pages/sitemap-blog.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const locales = ['en', 'ar', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ko', 'ms', 'nl', 'pt', 'ru', 'tl', 'tr', 'vi'];
  const lastmod = new Date().toISOString();
  
  // Fetch all blog posts from content collections
  const blogPosts = await Promise.all(
    locales.map(async (locale) => {
      try {
        const posts = await getCollection('blog', ({ id }) => id.startsWith(`${locale}/`));
        return posts.map(post => ({
          slug: post.id.replace(`${locale}/`, ''),
          locale: locale === 'en' ? '' : `/${locale}`,
          updated: post.data.updatedDate || post.data.pubDate || lastmod,
        }));
      } catch {
        return [];
      }
    })
  );

  const urls = blogPosts.flat().map(post => ({
    url: `https://tiktokio.cam${post.locale}/blog/${post.slug}/`,
    lastmod: post.updated,
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
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