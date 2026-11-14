import { g as getCollection } from '../chunks/_astro_content_BKmu8Jye.mjs';
export { renderers } from '../renderers.mjs';

const GET = async () => {
  const lastmod = (/* @__PURE__ */ new Date()).toISOString();
  const allPosts = await getCollection("blog");
  const urls = [];
  for (const post of allPosts) {
    const parts = post.id.split("/");
    const postLocale = parts.length > 1 ? parts[0] : "en";
    const slugWithExt = parts[parts.length - 1];
    const slug = slugWithExt.replace(/\.md$/, "");
    const base = postLocale === "en" || postLocale === "" ? "https://tiktokio.cam/blog" : `https://tiktokio.cam/${postLocale}/blog`;
    urls.push({
      url: `${base}/${slug}/`,
      lastmod: post.data.lastmod || lastmod
    });
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
