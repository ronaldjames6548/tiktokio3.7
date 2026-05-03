// astro.config.mjs
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { autolinkConfig } from './plugins/rehype-autolink-config';
import rehypeSlug from 'rehype-slug';
import alpinejs from '@astrojs/alpinejs';
import solidJs from '@astrojs/solid-js';
import AstroPWA from '@vite-pwa/astro';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  site: 'https://tiktokio.cam',

  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
    imageService: true,
  }),

  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      'ar',
      'de',
      'es',
      'fr',
      'hi',
      'id',
      'it',
      'ko',
      'ms',
      'nl',
      'pt',
      'ru',
      'tl',
      'tr',
      'vi',
    ],
    routing: {
      prefixDefaultLocale: false, // English pages at root, other languages prefixed
    },
  },

  trailingSlash: 'always',

  redirects: {
    // FIX: Old URLs removed from redirects are still in sitemap — remove them from sitemap-0.xml.ts
    // These redirects are correct (301 is fine), but the old slugs must NOT appear in sitemap
    '/musically-down': '/musical-down-tiktok-downloader/',
    '/musically-down/': '/musical-down-tiktok-downloader/',
    '/savetik-downloader-download-tiktok-videos-without-watermark': '/savetik-download-tiktok-video-without-watermark-free/',
    '/savetik-downloader-download-tiktok-videos-without-watermark/': '/savetik-download-tiktok-video-without-watermark-free/',

    // FIX: savett broken redirect — the ..astro file was renamed so the trailing-slash URL now resolves
    // No redirect entry needed here; handled by trailingSlash: 'always'

    // Clean 404 redirects
    '/404/': '/404',
    '/it/404/': '/404',
    '/ko/404/': '/404',
    '/ar/404/': '/404',
    '/fr/404/': '/404',
    '/de/404/': '/404',
    '/es/404/': '/404',
    '/hi/404/': '/404',
    '/id/404/': '/404',
    '/ru/404/': '/404',
    '/pt/404/': '/404',
    '/nl/404/': '/404',
    '/ms/404/': '/404',
    '/tr/404/': '/404',
    '/tl/404/': '/404',
    '/vi/404/': '/404',
  },

  vite: {
    plugins: [tailwindcss()],
    define: { __DATE__: `'${new Date().toISOString()}'` },
    ssr: { external: ['@tobyg74/tiktok-api-dl'] },
    optimizeDeps: { exclude: ['@tobyg74/tiktok-api-dl'] },
  },

  integrations: [
    alpinejs(),
    solidJs(),
    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tiktokio - TikTok Downloader - Download TikTok Videos Without Watermark',
        short_name: 'Tiktokio',
        theme_color: '#ffffff',
        icons: [
          { src: 'pwa-192x192.webp', sizes: '192x192', type: 'image/webp' },
          { src: 'pwa-512x512.webp', sizes: '512x512', type: 'image/webp' },
          { src: 'pwa-512x512.webp', sizes: '512x512', type: 'image/webp', purpose: 'any maskable' },
        ],
      },
      workbox: { navigateFallback: '/404', globPatterns: ['*.js'] },
      devOptions: { enabled: false, navigateFallbackAllowlist: [/^\\/404$/], suppressWarnings: true },
    }),
    icon(),
  ],

  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig]],
  },
});
