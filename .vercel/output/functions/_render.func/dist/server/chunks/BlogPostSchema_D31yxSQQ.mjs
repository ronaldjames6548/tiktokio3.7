import { c as createAstro, a as createComponent, b as renderTemplate, u as unescapeHTML } from './astro/server_CwGvPYwL.mjs';
import 'piccolore';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://tiktokio.cam");
const $$BlogPostSchema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPostSchema;
  const { title, description = "", image, datePublished, dateModified, author = "TikTokio Team", category, tags = [], lang = "en" } = Astro2.props;
  const siteUrl = (Astro2.site ? Astro2.site.toString().replace(/\/$/, "") : "") || "https://tiktokio.cam";
  const pageUrl = `${siteUrl}${Astro2.url.pathname}`;
  const toIso = (d) => (d instanceof Date ? d : new Date(d)).toISOString();
  const imageUrl = image ? image.startsWith("http") ? image : `${siteUrl}/${image.replace(/^\/+/, "")}` : `${siteUrl}/meta/opengraph.webp`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    headline: title.slice(0, 110),
    description,
    image: [imageUrl],
    datePublished: toIso(datePublished),
    dateModified: toIso(dateModified ?? datePublished),
    author: { "@type": "Person", name: (author || "TikTokio Team").trim() },
    publisher: {
      "@type": "Organization",
      name: "TikTokio",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/apple-touch-icon-180x180.webp` }
    },
    inLanguage: lang,
    ...category ? { articleSection: category } : {},
    ...tags.length ? { keywords: tags.join(", ") } : {}
  };
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema).replace(/</g, "\\u003c")));
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/BlogPostSchema.astro", void 0);

export { $$BlogPostSchema as $ };
