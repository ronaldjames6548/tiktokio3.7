export { renderers } from '../renderers.mjs';

const GET = async () => {
  const lastmod = (/* @__PURE__ */ new Date()).toISOString();
  const sitemaps = [
    { name: "sitemap-core.xml", priority: "1.0" },
    { name: "sitemap-blog.xml", priority: "0.9" },
    { name: "sitemap-blog-index.xml", priority: "0.8" }
  ];
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((s) => `  <sitemap>
    <loc>https://tiktokio.cam/${s.name}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>`;
  return new Response(sitemapIndex, {
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
