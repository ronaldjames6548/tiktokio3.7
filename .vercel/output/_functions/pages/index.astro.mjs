import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, b as renderTemplate, d as addAttribute, r as renderComponent } from '../chunks/astro/server_CwGvPYwL.mjs';
import 'piccolore';
import { $ as $$Container } from '../chunks/container_CyegQXfd.mjs';
import { d as ui, $ as $$Layout } from '../chunks/Layout_CoVKR8pR.mjs';
import { $ as $$Hero } from '../chunks/hero_5p21tiNT.mjs';
import { $ as $$Features } from '../chunks/features_uQHm1fcu.mjs';
import 'clsx';
import { $ as $$Faq } from '../chunks/faq_DH2QyEe6.mjs';
export { renderers } from '../renderers.mjs';

const $$Guide = createComponent(($$result, $$props, $$slots) => {
  const en = ui.en;
  const guideKeys = ["usecases", "device", "photo", "format", "spelling", "trouble", "apk", "responsible"];
  return renderTemplate`${maybeRenderHead()}<section class="max-w-7xl mx-auto px-4 py-8 text-gray-900 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-2"> <p class="text-sm text-gray-600">${en["home.updated"]}</p> ${guideKeys.map((k) => renderTemplate`<div class="mt-10"> <h2 class="text-2xl md:text-3xl font-bold text-gray-900">${en[`home.guide.${k}.h2`]}</h2> <div class="w-24 h-1 bg-orange-400 mt-2 mb-4"></div> <div class="text-lg leading-relaxed">${unescapeHTML(en[`home.guide.${k}.html`])}</div> </div>`)} </section>`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/guide.astro", void 0);

const moreLinksTitle = "More Links & Resources";
const moreLinksNote = "Sponsored and third-party links. TikTokio is not responsible for the content of external sites.";
const moreLinkGroups = ["Online tools", "Streaming & APK sites", "Games & apps"];
const moreLinks = [
  // Online tools
  { label: "Musicallydown", url: "https://musicaldown.se/", group: "Online tools" },
  { label: "mp3paw", url: "https://mp3paw.nu/", group: "Online tools" },
  { label: "White Screen Online", url: "https://whitescrn.com/", group: "Online tools" },
  // Streaming & APK sites
  { label: "SportzX APK", url: "https://sportzxapk.com.co", group: "Streaming & APK sites" },
  { label: "Pikashow APK", url: "https://pikashowtvs.org.in", group: "Streaming & APK sites" },
  { label: "Pikashow", url: "https://pikashowtv.in", group: "Streaming & APK sites" },
  { label: "VidMate", url: "https://vidmateapk.com.in", group: "Streaming & APK sites" },
  { label: "Onstream APK", url: "https://onstreamapp.app/", group: "Streaming & APK sites" },
  { label: "capcut mod apk", url: "https://capcuts.co.com/", group: "Streaming & APK sites" },
  { label: "apk result", url: "https://apkresult.io/", group: "Streaming & APK sites" },
  // Games & apps
  { label: "Pak Rummy Official", url: "https://pak-rummy.com.pk/", group: "Games & apps" },
  { label: "Winpkr", url: "https://winpkr.org/", group: "Games & apps" },
  { label: "Winpkr VIP", url: "https://winpkrvip.org/", group: "Games & apps" },
  { label: "666 Game", url: "https://666-wgame.com.pk/", group: "Games & apps" },
  { label: "A2 Game", url: "https://a2game.com.co/", group: "Games & apps" },
  { label: "Winpkr VIP 2", url: "https://winpkrpc.pk/", group: "Games & apps" },
  { label: "Q988 Game", url: "https://q98.com.pk/", group: "Games & apps" },
  { label: "S9 Pro", url: "https://s9pro.pk/", group: "Games & apps" },
  { label: "N999", url: "https://n999game.net.pk/", group: "Games & apps" },
  { label: "Teen Patti Blue", url: "https://3patiblue.com.pk/", group: "Games & apps" },
  { label: "Z777", url: "https://z777game.pk/", group: "Games & apps" },
  { label: "Winrupees", url: "https://winrupees.com.pk/", group: "Games & apps" },
  { label: "X666", url: "https://x666game.pk/", group: "Games & apps" },
  { label: "Playpkr", url: "https://playpkr.net.pk/", group: "Games & apps" },
  { label: "H555", url: "https://h555.pk/", group: "Games & apps" },
  { label: "Pak Rummy", url: "https://pakrummy.com.pk/", group: "Games & apps" },
  { label: "Pkrslots", url: "https://pkrslots.com.pk/", group: "Games & apps" },
  { label: "P999 Game", url: "https://p999.com.pk/", group: "Games & apps" },
  { label: "Pak Games", url: "https://pakgame.net.pk/", group: "Games & apps" },
  { label: "988", url: "https://988winapp.pk/", group: "Games & apps" },
  { label: "3patti Showy", url: "https://3pattishowy.pk/", group: "Games & apps" },
  { label: "288win", url: "https://288winapp.pk/", group: "Games & apps" },
  { label: "Q98", url: "https://q98games.pk/", group: "Games & apps" },
  { label: "Fantasy Gems", url: "https://fantasygems-game.pk/", group: "Games & apps" },
  { label: "We999", url: "https://we99.com.pk/", group: "Games & apps" },
  { label: "Betpkr", url: "https://betpkrapp.com.pk/", group: "Games & apps" },
  { label: "Six Game", url: "https://sixgames.com.pk/", group: "Games & apps" }
];

const $$Morelinks = createComponent(($$result, $$props, $$slots) => {
  const groups = moreLinkGroups.map((name) => ({ name, items: moreLinks.filter((l) => l.group === name) })).filter((g) => g.items.length > 0);
  return renderTemplate`${groups.length > 0 && renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-7xl px-6 py-10 lg:px-8" aria-labelledby="more-links"><div class="text-center mb-6"><h2 id="more-links" class="text-2xl md:text-3xl font-bold text-gray-900">${moreLinksTitle}</h2><div class="w-24 h-1 mx-auto bg-orange-400 mt-2"></div><p class="mt-3 text-sm text-gray-600">${moreLinksNote}</p></div>${groups.map((g) => renderTemplate`<div class="mb-6"><h3 class="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">${g.name}</h3><div class="flex flex-wrap gap-2">${g.items.map((l) => renderTemplate`<a${addAttribute(l.url, "href")} target="_blank" rel="sponsored nofollow noopener noreferrer" class="inline-block rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-sm text-gray-900 no-underline hover:border-orange-400">${l.label}</a>`)}</div></div>`)}</section>`}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/morelinks.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const en = ui.en;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": en["home.meta.title"], "description": en["home.meta.description"], "keywords": en["home.meta.keywords"] }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HomeHero", $$Hero, {})} ${maybeRenderHead()}<div> ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "HomeFeatures", $$Features, {})} ${renderComponent($$result3, "HomeGuide", $$Guide, {})} ${renderComponent($$result3, "HomeFaq", $$Faq, {})} ${renderComponent($$result3, "MoreLinks", $$Morelinks, {})} ` })} </div> ` })}`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/index.astro", void 0);

const $$file = "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
