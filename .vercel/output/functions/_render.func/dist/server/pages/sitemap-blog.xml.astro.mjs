export { renderers } from '../renderers.mjs';

const GET = async () => {
  const locales = ["", "ar", "de", "es", "fr", "hi", "id", "it", "ko", "ms", "nl", "pt", "ru", "tl", "tr", "vi"];
  const lastmod = (/* @__PURE__ */ new Date()).toISOString();
  const blogIndexPages = [
    { path: "/blog/", priority: 0.9, changefreq: "daily" }
    // You can add more static blog-related pages here if needed
  ];
  const urls = locales.flatMap(
    (locale) => blogIndexPages.map((page) => {
      const base = locale ? `https://tiktokio.cam/${locale}` : "https://tiktokio.cam";
      return {
        url: `${base}${page.path}`,
        priority: page.priority,
        changefreq: page.changefreq
      };
    })
  );
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
