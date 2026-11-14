import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_CwGvPYwL.mjs';
import 'piccolore';
import { g as getCollection } from '../../../chunks/_astro_content_L1ZQ1O-k.mjs';
import { $ as $$Container } from '../../../chunks/container_CyegQXfd.mjs';
import { g as getLangFromUrl, b as buildPostDescription, $ as $$Layout, c as getRelativeLocaleUrl } from '../../../chunks/Layout_CoVKR8pR.mjs';
import { $ as $$BlogPostSchema } from '../../../chunks/BlogPostSchema_D31yxSQQ.mjs';
import { g as getArticleReadingTime } from '../../../chunks/blog_CFImKJjS.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const requestedLang = Astro2.params.lang || getLangFromUrl(Astro2.url) || "en";
  const requestedSlug = Astro2.params.slug;
  console.log("=== DEBUG [slug].astro ===");
  console.log("URL:", Astro2.url.pathname);
  console.log("Detected Lang:", requestedLang);
  console.log("Requested Slug:", requestedSlug);
  const allPosts = await getCollection("blog");
  const post = allPosts.find((p) => {
    const [postLang, ...rest] = p.slug.split("/");
    const fileSlug = rest.join("/");
    const normalizedFile = fileSlug.toLowerCase().replace(/[-\s]+/g, "-");
    const normalizedRequest = requestedSlug.toLowerCase().replace(/[-\s]+/g, "-");
    return postLang === requestedLang && normalizedFile === normalizedRequest;
  });
  if (!post) {
    console.log("\u274C POST NOT FOUND for", requestedLang);
    return Astro2.redirect(`/${requestedLang}/404`);
  }
  console.log("\u2705 LOADED:", post.slug);
  const { data, render } = post;
  const { Content } = await render();
  const readTime = getArticleReadingTime(post.body);
  const currentLang = requestedLang;
  function localizePath(path) {
    if (!path || path.startsWith("http") || path === "#") return path;
    return getRelativeLocaleUrl(currentLang, path);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": data.title, "description": buildPostDescription(data.snippet, currentLang), "lang": currentLang }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Container", $$Container, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto prose prose-lg dark:prose-invert mt-14"> ${data.category && renderTemplate`<a${addAttribute(localizePath(`/blog/category/${data.category?.toLowerCase()}`), "href")} class="text-blue-400 dark:text-stone-400 uppercase tracking-wider text-sm font-medium"> ${data.category} </a>`} <h1 class="text-4xl mb-3 lg:text-5xl font-bold lg:tracking-tight mt-1 lg:leading-tight dark:text-white"> ${data.title} </h1> <div class="flex gap-2 mt-4 text-sm text-gray-500"> <span>${data.author}</span> <span>•</span> <span>${readTime} min read</span> <span>•</span> <time${addAttribute(data.publishDate?.toISOString() || "", "datetime")}> ${data.publishDate?.toDateString() || ""} </time> </div> <article class="prose prose-lg dark:prose-invert mt-10"> ${renderComponent($$result3, "Content", Content, {})} </article> <div class="mt-16 text-center"> <a${addAttribute(localizePath("/blog"), "href")} class="inline-flex items-center gap-2 hover:underline">
← Back to Blog
</a> </div> </div> ` })} `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "BlogPostSchema", $$BlogPostSchema, { "slot": "head", "title": data.title, "description": data.snippet, "image": data.image?.src, "datePublished": data.publishDate, "author": data.author, "category": data.category, "tags": data.tags, "lang": currentLang })}` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/vi/blog/[slug].astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/vi/blog/[slug].astro";
const $$url = "/vi/blog/[slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
