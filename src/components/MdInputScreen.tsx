// src/components/MdInputScreen.tsx
import { toast, Toaster } from "solid-toast";
import { createSignal, Show } from "solid-js";
import InputSection from "./MdInputSection";
import ResultSection from "./MdResultSection";

interface TikTokData {
  status: string | null;
  result: {
    type: string | null;
    author: { avatar: string | null; nickname: string | null } | null;
    desc: string | null;
    videoSD: string | null;
    videoHD: string | null;
    video_hd: string | null;
    videoWatermark: string | null;
    music: string | null;
    thumbnail?: string | null;
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
  } | null;
}

function MdInputScreen() {
  const [url, setUrl] = createSignal("");
  const [data, setData] = createSignal<TikTokData | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [autoProcessing, setAutoProcessing] = createSignal(false);

  // ==================== URL HELPERS ====================
  const extractTikTokUrl = (text: string): string => {
    const patterns = [
      /https?:\/\/(?:www\.)?tiktok\.com\/@[^\/\s]*\/video\/\d+[^\s]*/g,
      /https?:\/\/(?:www\.)?tiktok\.com\/t\/[A-Za-z0-9]+[^\s]*/g,
      /https?:\/\/vm\.tiktok\.com\/[A-Za-z0-9]+[^\s]*/g,
      /https?:\/\/vt\.tiktok\.com\/[A-Za-z0-9]+[^\s]*/g,
      /https?:\/\/m\.tiktok\.com\/v\/\d+\.html[^\s]*/g,
      /https?:\/\/[^\/]*tiktok\.com\/[^\s]*/g
    ];

    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches?.length) {
        return matches[0].replace(/[.,!?;]+$/, '');
      }
    }
    return text.trim();
  };

  const isValidTikTokUrl = (url: string): boolean => {
    return /tiktok\.com|vm\.tiktok|vt\.tiktok|m\.tiktok/.test(url);
  };

  const cleanTikTokUrl = (url: string): string => {
    let clean = extractTikTokUrl(url);
    if (clean.includes('?')) clean = clean.split('?')[0];
    if (clean.includes('#')) clean = clean.split('#')[0];
    if (!clean.startsWith('http')) clean = 'https://' + clean;
    return clean.replace(/\/+$/, '');
  };

  // ==================== FETCH VIDEO DATA ====================
  const fetchData = async () => {
    const inputUrl = url().trim();
    if (!inputUrl) {
      toast.error("Please enter a TikTok URL");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const cleanedUrl = cleanTikTokUrl(inputUrl);

      if (!isValidTikTokUrl(cleanedUrl)) {
        throw new Error("Please enter a valid TikTok URL");
      }

      const apiUrl = `/api/tik.json?url=${encodeURIComponent(cleanedUrl)}`;
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (!res.ok || json.status === "error" || json.error) {
        throw new Error(json.error || "Failed to fetch video");
      }

      if (!json.result) {
        throw new Error("No video data found");
      }

      setData(json);
      toast.success("Video loaded successfully!", { duration: 2000 });

    } catch (err: any) {
      console.error(err);
      const message = err.message || "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==================== PASTE HANDLER ====================
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const cleaned = cleanTikTokUrl(text);
      setUrl(cleaned);

      if (isValidTikTokUrl(cleaned)) {
        toast.success("URL pasted! Click Download to process.");
      }
    } catch {
      toast.error("Failed to read clipboard");
    }
  };

  const cancelAutoProcessing = () => setAutoProcessing(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (autoProcessing()) return;
    fetchData();
  };

  // ==================== HELPERS FOR RESULT SECTION ====================
  const getVideoUrl = () => {
    const result = data()?.result;
    return result?.videoSD || result?.videoHD || result?.video_hd || 
           result?.videoWatermark || result?.music || "";
  };

  const getAuthorInfo = () => ({
    avatar: data()?.result?.author?.avatar || "",
    nickname: data()?.result?.author?.nickname || "Unknown Author"
  });

  const getSafeFilename = () => {
    const author = getAuthorInfo().nickname;
    return author.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
  };

  // Direct Download (No Modal)
  const handleDownloadClick = (downloadUrl: string, filename: string) => {
    if (!downloadUrl) {
      toast.error("Download URL not available");
      return;
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => document.body.removeChild(link), 100);

    toast.success("Download started!", { duration: 2000 });
  };

  return (
    <div class="max-w-6xl mx-auto mt-8 px-4">
      <Toaster />

      <Show when={!data()}>
        <InputSection
          url={url()}
          setUrl={setUrl}
          loading={loading()}
          autoProcessing={autoProcessing()}
          onSubmit={handleSubmit}
          onPaste={handlePaste}
          onCancelAutoProcessing={cancelAutoProcessing}
          error={error()}
          extractTikTokUrl={extractTikTokUrl}
          cleanTikTokUrl={cleanTikTokUrl}
          isValidTikTokUrl={isValidTikTokUrl}
        />
      </Show>

      <Show when={!!data() && !!data()?.result}>
        <ResultSection
          data={data()}
          getVideoUrl={getVideoUrl}
          getAuthorInfo={getAuthorInfo}
          getSafeFilename={getSafeFilename}
          onDownloadClick={handleDownloadClick}
        />
      </Show>
    </div>
  );
}

export default MdInputScreen;