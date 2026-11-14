import { a as createComponent, m as maybeRenderHead, u as unescapeHTML, b as renderTemplate } from './astro/server_CwGvPYwL.mjs';
import 'piccolore';
import 'clsx';
import { d as ui } from './Layout_CoVKR8pR.mjs';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  const en = ui.en;
  const faqs = [];
  for (let n = 1; en[`home.faq.question${n}`]; n++) {
    faqs.push({ q: en[`home.faq.question${n}`], a: en[`home.faq.answer${n}`] });
  }
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto max-w-7xl px-6 py-12 lg:px-8"> <div class="mx-auto divide-y divide-gray-900/10"> <div class="text-center mb-16"> <h2 class="text-2xl md:text-3xl font-bold text-gray-900">${en["home.faq.title_sec1"]} <span class="text-orange-400">Tiktokio</span> - ${en["home.faq.title_sec2"]}</h2> <div class="w-24 h-1 mx-auto bg-orange-400"></div> <p class="mt-4 mx-auto text-lg text-gray-900">${en["home.faq.faq_text"]}</p> </div> <section> <div class="grid md:grid-cols-2 gap-6"> ${faqs.map((f) => renderTemplate`<div class="rounded-lg border-color-blue shadow bg-card text-card-foreground shadow-sm"> <div class="flex flex-col space-y-1.5 p-6"> <h3 class="font-semibold tracking-tight text-lg">${f.q}</h3> </div> <div class="p-6 pt-0"> <p class="text-muted-foreground">${unescapeHTML(f.a)}</p> </div> </div>`)} </div> </section> </div> </div>`;
}, "C:/Users/Omar/Downloads/Compressed/tiktokio3.7/src/components/faq.astro", void 0);

export { $$Faq as $ };
