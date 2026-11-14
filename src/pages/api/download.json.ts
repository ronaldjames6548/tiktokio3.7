// src/pages/api/download.json.ts
// Same-origin download proxy for images (profile picture / thumbnail).
// Guarantees a non-empty file: if TikTok's CDN returns an error, an HTML page
// or an empty body, the client gets a real HTTP error instead of a 0-byte file.
import type { APIRoute } from "astro";

export const prerender = false;

// Only proxy known TikTok / ByteDance CDN hosts (prevents open-proxy / SSRF abuse)
const ALLOWED_HOST_SUFFIXES = [
  "tiktokcdn.com", "tiktokcdn-us.com", "tiktokcdn-eu.com", "tiktokv.com", "tiktokv.us",
  "tiktok.com", "tiktokw.us", "byteoversea.com", "ibytedtos.com", "ibyteimg.com",
  "byteimg.com", "bytecdn.cn", "muscdn.com", "musical.ly", "tikwm.com",
  "douyinpic.com", "douyinvod.com", "douyincdn.com", "snssdk.com", "pstatp.com",
  "ttwstatic.com", "tiktokcdn.net", "musicallydown.com", "ssstik.io",
];

const UA_DESKTOP =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const UA_MOBILE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1";

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg", "image/jpg": ".jpg", "image/png": ".png",
  "image/webp": ".webp", "image/heic": ".heic", "image/avif": ".avif",
  "image/gif": ".gif", "audio/mpeg": ".mp3", "video/mp4": ".mp4",
};

function normalizeUrl(raw: string): string {
  let u = (raw || "").trim().replace(/&amp;/g, "&");
  if (u.startsWith("//")) u = "https:" + u;
  if (u.startsWith("http://")) u = "https://" + u.slice(7);
  return u;
}

function hostAllowed(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return ALLOWED_HOST_SUFFIXES.some((s) => h === s || h.endsWith("." + s));
}

function safeName(name: string): string {
  return (name || "tiktokio.cam_download").replace(/[^\w.\-]+/g, "_").slice(0, 120);
}

function errorResponse(status: number, message: string, extra?: Record<string, unknown>) {
  return new Response(JSON.stringify({ status: "error", error: message, ...extra }), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function attachmentHeaders(contentType: string, filename: string, length: number) {
  return {
    "Content-Type": contentType,
    "Content-Length": String(length),
    "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  };
}

export const GET: APIRoute = async ({ url: requestUrl }) => {
  const rawUrl = requestUrl.searchParams.get("url");
  const typeParam = (requestUrl.searchParams.get("type") || ".jpg").toLowerCase();
  const title = requestUrl.searchParams.get("title") || "tiktokio.cam_download";

  if (!rawUrl) return errorResponse(400, "Missing url parameter");

  // 1) data: URIs (some scrapers return the avatar inline as base64)
  if (rawUrl.startsWith("data:")) {
    const m = rawUrl.match(/^data:([^;,]+)?(;base64)?,(.*)$/s);
    if (!m) return errorResponse(400, "Invalid data URI");
    const mime = m[1] || "image/jpeg";
    const bytes = m[2] ? Buffer.from(m[3], "base64") : Buffer.from(decodeURIComponent(m[3]));
    if (!bytes.length) return errorResponse(502, "Empty image data");
    const ext = EXT_BY_TYPE[mime] || typeParam;
    const name = safeName(title.replace(/\.[a-z0-9]{2,4}$/i, "")) + ext;
    return new Response(bytes, { status: 200, headers: attachmentHeaders(mime, name, bytes.length) });
  }

  // 2) normal remote URLs
  let target: URL;
  try {
    target = new URL(normalizeUrl(rawUrl));
  } catch {
    return errorResponse(400, "Invalid url");
  }
  if (target.protocol !== "https:" || !hostAllowed(target.hostname)) {
    return errorResponse(403, "Host not allowed", { host: target.hostname });
  }

  // Try several header profiles: TikTok CDNs sometimes reject a Referer or a UA.
  const attempts: Record<string, string>[] = [
    { "User-Agent": UA_DESKTOP, Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8", Referer: "https://www.tiktok.com/" },
    { "User-Agent": UA_DESKTOP, Accept: "image/*,*/*;q=0.8" },
    { "User-Agent": UA_MOBILE, Accept: "*/*" },
  ];

  let lastStatus = 0;
  let lastReason = "";

  for (const headers of attempts) {
    try {
      const upstream = await fetch(target.toString(), {
        headers,
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
      });
      lastStatus = upstream.status;

      if (!upstream.ok) {
        lastReason = `upstream ${upstream.status}`;
        continue;
      }

      const contentType = (upstream.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
      if (contentType.includes("text/html") || contentType.includes("json")) {
        lastReason = `unexpected content-type ${contentType}`;
        continue;
      }

      const buf = Buffer.from(await upstream.arrayBuffer());
      if (buf.length === 0) {
        lastReason = "empty body";
        continue;
      }

      const mime = EXT_BY_TYPE[contentType] ? contentType : typeParam === ".mp3" ? "audio/mpeg" : typeParam === ".mp4" ? "video/mp4" : "image/jpeg";
      const ext = EXT_BY_TYPE[mime] || typeParam;
      const name = safeName(title.replace(/\.[a-z0-9]{2,4}$/i, "")) + ext;

      return new Response(buf, { status: 200, headers: attachmentHeaders(mime, name, buf.length) });
    } catch (err: any) {
      lastReason = err?.message || "fetch failed";
    }
  }

  console.error("[api/download.json] failed:", target.hostname, lastStatus, lastReason);
  return errorResponse(502, "Could not fetch the file from TikTok. The link may have expired - please fetch the video again.", {
    upstreamStatus: lastStatus,
    reason: lastReason,
  });
};
