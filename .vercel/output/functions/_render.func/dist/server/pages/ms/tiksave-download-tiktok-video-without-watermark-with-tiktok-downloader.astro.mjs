import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, F as Fragment } from '../../chunks/astro/server_CwGvPYwL.mjs';
import 'piccolore';
import { $ as $$Container } from '../../chunks/container_CyegQXfd.mjs';
import { g as getLangFromUrl, $ as $$Layout } from '../../chunks/Layout_CoVKR8pR.mjs';
import { $ as $$TiksaveHero } from '../../chunks/tiksave-hero_DeUUOG_1.mjs';
import { $ as $$Features } from '../../chunks/features_uQHm1fcu.mjs';
import { $ as $$Logos, a as $$Newsletter } from '../../chunks/logos_CFQEKSOX.mjs';
import { $ as $$Faq } from '../../chunks/faq_DH2QyEe6.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tiktokio.cam");
const $$TiksaveDownloadTiktokVideoWithoutWatermarkWithTiktokDownloader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TiksaveDownloadTiktokVideoWithoutWatermarkWithTiktokDownloader;
  const safeUrl = Astro2.url || new URL("/", Astro2.site || "http://localhost:4321");
  getLangFromUrl(safeUrl);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`  ${renderComponent($$result3, "Features", $$Features, {})} ${renderComponent($$result3, "Logos", $$Logos, {})} ${renderComponent($$result3, "Newsletter", $$Newsletter, {})} ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} `, "hero": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "hero" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Hero", $$TiksaveHero, {})} ` })}` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/ms/tiksave-download-tiktok-video-without-watermark-with-tiktok-downloader.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/ms/tiksave-download-tiktok-video-without-watermark-with-tiktok-downloader.astro";
const $$url = "/ms/tiksave-download-tiktok-video-without-watermark-with-tiktok-downloader/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TiksaveDownloadTiktokVideoWithoutWatermarkWithTiktokDownloader,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
