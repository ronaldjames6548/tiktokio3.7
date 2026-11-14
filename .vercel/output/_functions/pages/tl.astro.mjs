import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../chunks/astro/server_CwGvPYwL.mjs';
import 'piccolore';
import { $ as $$Container } from '../chunks/container_CyegQXfd.mjs';
import { $ as $$Faq } from '../chunks/faq_DP0753al.mjs';
import { $ as $$Features } from '../chunks/features_Bucc78n1.mjs';
import { $ as $$Hero } from '../chunks/hero_HN9CvYh2.mjs';
import { g as getLangFromUrl, $ as $$Layout, d as ui } from '../chunks/Layout_CJ6Z25vH.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  const tl = ui.tl;
  const guideKeys = ["device", "format", "slideshow", "trouble", "apk", "spelling", "responsible"];
  const extraFaqs = [7, 8, 9, 10].filter((n) => tl[`faq.question${n}`]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "dir": lang === "tl" ? "ltr" : "ltr" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Features", $$Features, {})} ${maybeRenderHead()}<section class="max-w-7xl mx-auto px-4 py-8 text-gray-900 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-2"> <p class="text-sm text-gray-600">${tl["tl.updated"]}</p> ${guideKeys.map((k) => renderTemplate`<div class="mt-10"> <h2 class="text-2xl md:text-3xl font-bold text-gray-900">${tl[`guide.${k}.h2`]}</h2> <div class="w-24 h-1 bg-orange-400 mt-2 mb-4"></div> <div class="text-lg leading-relaxed">${unescapeHTML(tl[`guide.${k}.html`])}</div> </div>`)} </section> ${renderComponent($$result3, "Faq", $$Faq, {})} ${extraFaqs.length > 0 && renderTemplate`<div class="mx-auto max-w-7xl px-6 pb-12 lg:px-8"> <div class="grid md:grid-cols-2 gap-6"> ${extraFaqs.map((n) => renderTemplate`<div class="rounded-lg border-color-blue shadow bg-card text-card-foreground shadow-sm"> <div class="flex flex-col space-y-1.5 p-6"> <div class="font-semibold tracking-tight text-lg">${tl[`faq.question${n}`]}</div> </div> <div class="p-6 pt-0"> <p class="text-muted-foreground">${tl[`faq.answer${n}`]}</p> </div> </div>`)} </div> </div>`}` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/tl/index.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/tl/index.astro";
const $$url = "/tl/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
