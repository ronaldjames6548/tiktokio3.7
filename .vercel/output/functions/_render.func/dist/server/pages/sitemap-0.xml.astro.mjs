import { g as getCollection } from '../chunks/_astro_content_L1ZQ1O-k.mjs';
export { renderers } from '../renderers.mjs';

const GET = async () => {
  const locales = ["en", "ar", "de", "es", "fr", "hi", "id", "it", "ko", "ms", "nl", "pt", "ru", "tl", "tr", "vi"];
  const baseUrl = "https://tiktokio.cam";
  const lastmod = (/* @__PURE__ */ new Date()).toISOString();
  const corePaths = [
    "/",
    "/tiktok-downloader/",
    "/tiktok-video-downloader/",
    "/tiktok-photo-downloader/",
    "/tiktok-thumbnail-downloader/",
    "/download-tiktok-video/",
    "/musical-down-tiktok-downloader/",
    "/savefrom-download-from-tiktok/",
    "/savetik-download-tiktok-video-without-watermark-free/",
    "/savett-tiktok-downloader-save-tiktok-videos/",
    "/snaptik-tiktok-downloader-download-video-tiktok-without-watermark/",
    "/ssstiktok-download-tiktok-videos-without-watermark-free-tiktok-video-downloader/",
    "/tikmate-tiktok-downloader-without-watermark-in-hd/",
    "/tiksave-download-tiktok-video-without-watermark-with-tiktok-downloader/",
    "/tiktoksss-tiktok-downloader-without-watermark/",
    "/tmate-tiktok-downloader/",
    "/ttdownloader-downloader-no-watermark-video-downloader-for-tiktok/",
    "/about/",
    "/contact/",
    "/privacy-policy/",
    "/terms-of-service/"
  ];
  let blogPosts = [];
  for (const locale of locales) {
    try {
      const posts = await getCollection("blog", ({ id }) => id.startsWith(`${locale}/`));
      posts.forEach((post) => {
        blogPosts.push({
          slug: post.id.replace(`${locale}/`, "").replace(/\.mdx?$/, ""),
          localePrefix: locale === "en" ? "" : `/${locale}`,
          updated: post.data.updatedDate || post.data.pubDate || lastmod
        });
      });
    } catch {
      console.warn(`⚠️ Skipped blog collection for locale: ${locale}`);
    }
  }
  const urls = [];
  for (const locale of locales) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    for (const path of corePaths) {
      urls.push(`  <url>
    <loc>${baseUrl}${prefix}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`);
    }
  }
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
${urls.join("\n")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
      // Vercel edge caching
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
