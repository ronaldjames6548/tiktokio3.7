import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  if (!url?.pathname) {
    return defaultLang;
  }

  const pathname = url.pathname;
  if (typeof pathname !== 'string') {
    return defaultLang;
  }

  // Split and get the first segment after root (language code)
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // Check if it's a valid language
  if (firstSegment && firstSegment in ui) {
    return firstSegment as keyof typeof ui;
  }

  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
  if (!url?.pathname) return undefined;

  const pathname = url.pathname;
  if (typeof pathname !== 'string') return undefined;

  const parts = pathname.split('/').filter(Boolean);
  const currentLang = getLangFromUrl(url);

  // Remove language prefix if not default
  if (currentLang !== defaultLang && parts[0] === currentLang) {
    parts.shift();
  }

  return parts.join('/') || undefined;
}