import { a as createComponent, r as renderComponent, b as renderTemplate, F as Fragment } from '../chunks/astro/server_CwGvPYwL.mjs';
import 'piccolore';
import { $ as $$Container } from '../chunks/container_CyegQXfd.mjs';
import { $ as $$Layout } from '../chunks/Layout_CoVKR8pR.mjs';
import { $ as $$SsstikHero } from '../chunks/ssstik-hero_DGtOIChc.mjs';
import { $ as $$Features } from '../chunks/features_uQHm1fcu.mjs';
import { $ as $$Logos, a as $$Newsletter } from '../chunks/logos_CFQEKSOX.mjs';
import { $ as $$Faq } from '../chunks/faq_DH2QyEe6.mjs';
export { renderers } from '../renderers.mjs';

const $$SsstiktokDownloadTiktokVideosWithoutWatermarkFreeTiktokVideoDownloader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`  ${renderComponent($$result3, "Features", $$Features, {})} ${renderComponent($$result3, "Logos", $$Logos, {})} ${renderComponent($$result3, "Newsletter", $$Newsletter, {})} ${renderComponent($$result3, "Faq", $$Faq, {})} ` })} `, "hero": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "hero" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Hero", $$SsstikHero, {})} ` })}` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/ssstiktok-download-tiktok-videos-without-watermark-free-tiktok-video-downloader.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/ssstiktok-download-tiktok-videos-without-watermark-free-tiktok-video-downloader.astro";
const $$url = "/ssstiktok-download-tiktok-videos-without-watermark-free-tiktok-video-downloader/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SsstiktokDownloadTiktokVideosWithoutWatermarkFreeTiktokVideoDownloader,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
