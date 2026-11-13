// SEO helpers: keep <title> <= 60 chars and meta description within 110-160 chars.
import { ui, defaultLang } from './ui';

const TRAIL = /[\s\-–—:;,.|·&/(\[]+$/u;

/** Cut text at a word boundary so it is at most `max` characters. */
function cutAtWord(text: string, max: number): string {
  const chars = [...text];
  if (chars.length <= max) return text;
  const head = chars.slice(0, max).join('');
  const lastSpace = head.lastIndexOf(' ');
  const cut = lastSpace >= Math.floor(max * 0.5) ? head.slice(0, lastSpace) : head;
  return cut.replace(TRAIL, '');
}

/** Title guard: never longer than 60 characters (Ahrefs "Title too long"). */
export function clampTitle(title: string, max = 60): string {
  const t = (title || '').replace(/\s+/g, ' ').trim();
  return cutAtWord(t, max);
}

/** Description guard: never longer than 160 characters (prefers ending on a full sentence). */
export function clampDescription(desc: string, max = 160): string {
  const d = (desc || '').replace(/\s+/g, ' ').trim();
  if ([...d].length <= max) return d;
  const head = [...d].slice(0, max).join('');
  const sentenceEnd = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '), head.lastIndexOf('。'), head.lastIndexOf('। '));
  if (sentenceEnd >= 110) return head.slice(0, sentenceEnd + 1);
  return cutAtWord(d, max - 1) + '…';
}

/**
 * Blog post description: uses the post snippet; if it is shorter than 110 characters
 * a short localized sentence about TikTokio is appended, then the result is clamped to 160.
 */
export function buildPostDescription(snippet: string | undefined, lang: string, min = 112): string {
  const dict: any = (ui as any)[lang] || (ui as any)[defaultLang];
  const suffix: string = dict['blog.post_suffix'] || (ui as any)[defaultLang]['blog.post_suffix'];
  let s = (snippet || '').replace(/\s+/g, ' ').trim();
  if (!s) return clampDescription(dict['site.description'] || '', 160);
  if ([...s].length < min) {
    const sep = /[.!?。।…]$/u.test(s) ? ' ' : '. ';
    s = `${s}${sep}${suffix}`;
  }
  return clampDescription(s, 160);
}
