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
    locales: ['en', 'ar', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ko', 'ms', 'nl', 'pt', 'ru', 'tl', 'tr', 'vi'],
    routing: {
      prefixDefaultLocale: false, // English at root, others prefixed (e.g., /es/, /fr/)
    },
  },
  trailingSlash: 'always',
  redirects: {
    '/musically-down': '/musical-down-tiktok-downloader/',
    '/musically-down/': '/musical-down-tiktok-downloader/',
    '/savetik-downloader-download-tiktok-videos-without-watermark': '/savetik-download-tiktok-video-without-watermark-free/',
    '/savetik-downloader-download-tiktok-videos-without-watermark/': '/savetik-download-tiktok-video-without-watermark-free/',
    // Clean 404 redirects
    '/404/': '/404',
    '/it/404/': '/404', '/ko/404/': '/404', '/ar/404/': '/404', '/fr/404/': '/404',
    '/de/404/': '/404', '/es/404/': '/404', '/hi/404/': '/404', '/id/404/': '/404',
    '/ru/404/': '/404', '/pt/404/': '/404', '/nl/404/': '/404', '/ms/404/': '/404',
    '/tr/404/': '/404', '/tl/404/': '/404', '/vi/404/': '/404',
    // Fix: 404 on spike-mod-apk URL with spaces (%20) — redirect to correct hyphenated URL
    '/blog/spike-mod-apk%202025-v5-9-205-unlocked-all%20characters-max-level/':
      '/blog/spike-mod-apk-2025-v5-9-205-unlocked-all-characters-max-level/',
  },
  vite: {
    plugins: [tailwindcss()],
    define: { DATE: `'${new Date().toISOString()}'` },
    ssr: {
      external: ['@tobyg74/tiktok-api-dl'],
    },
    optimizeDeps: {
      exclude: ['@tobyg74/tiktok-api-dl'],
    },
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
      devOptions: { enabled: false, navigateFallbackAllowlist: [/^\/404$/], suppressWarnings: true },
    }),
    icon(),
  ],
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig]],
  },
});
