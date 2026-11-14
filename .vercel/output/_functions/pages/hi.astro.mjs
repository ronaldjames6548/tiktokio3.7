import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_CwGvPYwL.mjs';
import 'piccolore';
import { $ as $$Container } from '../chunks/container_CyegQXfd.mjs';
import { $ as $$Faq } from '../chunks/faq_DH2QyEe6.mjs';
import { $ as $$Features } from '../chunks/features_uQHm1fcu.mjs';
import { $ as $$Hero } from '../chunks/hero_5p21tiNT.mjs';
import { g as getLangFromUrl, $ as $$Layout } from '../chunks/Layout_CoVKR8pR.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  const lang = getLangFromUrl(safeUrl);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "dir": lang === "hi" ? "ltr" : "ltr" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Features", $$Features, {})} ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/hi/index.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/hi/index.astro";
const $$url = "/hi/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
