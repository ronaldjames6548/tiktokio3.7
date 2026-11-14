// src/utils/saveFile.ts
// Saves a download under OUR filename (e.g. "tiktokio.cam_Author_audio.mp3").
// Cross-origin links ignore the <a download> attribute, so the name used to come
// from the Worker. Here we fetch the file, wrap it in a blob and save it with our
// own name. If the fetch is blocked (CORS) or the file is huge, we fall back to a
// normal link so the download never breaks.

const MAX_BLOB_BYTES = 200 * 1024 * 1024; // above this, use the direct link instead

function siteHost(): string {
  if (typeof window === "undefined") return "tiktokio.cam";
  return window.location.hostname.replace(/^www\./, "").replace(/[^a-zA-Z0-9.-]/g, "");
}

function extFromType(url: string, filename: string, mime: string): string {
  try {
    const t = new URL(url, window.location.href).searchParams.get("type");
    if (t && /^\.[a-z0-9]{2,4}$/i.test(t)) return t.toLowerCase();
  } catch {}
  const m = filename.match(/\.[a-z0-9]{2,4}$/i);
  if (m) return m[0].toLowerCase();
  if (mime.includes("mpeg") || mime.includes("mp3")) return ".mp3";
  if (mime.includes("mp4")) return ".mp4";
  if (mime.includes("png")) return ".png";
  if (mime.includes("webp")) return ".webp";
  return ".mp4";
}

export function buildFilename(url: string, filename: string, mime = ""): string {
  const ext = extFromType(url, filename, mime);
  let base = (filename || "download").replace(/\.[a-z0-9]{2,4}$/i, "");
  const host = siteHost();
  if (!base.startsWith(host)) base = `${host}_${base}`;
  return base.replace(/[\\/:*?"<>|]+/g, "_") + ext;
}

function anchorSave(href: string, name?: string) {
  const link = document.createElement("a");
  link.href = href;
  if (name) link.download = name;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => document.body.removeChild(link), 100);
}

export async function saveWithName(url: string, filename: string): Promise<void> {
  const fallbackName = buildFilename(url, filename);
  try {
    const controller = new AbortController();
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const len = Number(res.headers.get("content-length") || 0);
    if (len > MAX_BLOB_BYTES) {
      controller.abort();
      throw new Error("File too large for in-page save");
    }

    const blob = await res.blob();
    if (!blob.size) throw new Error("Empty file");

    const name = buildFilename(url, filename, blob.type);
    const objectUrl = URL.createObjectURL(blob);
    anchorSave(objectUrl, name);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 30000);
  } catch (err) {
    console.warn("[saveWithName] blob save failed, using direct link:", err);
    anchorSave(url, fallbackName);
  }
}
