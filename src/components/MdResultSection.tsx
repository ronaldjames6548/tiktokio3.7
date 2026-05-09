// src/components/MdResultSection.tsx
import AdBanner from "./nadbanner";

interface ResultSectionProps {
  data: any;
  getVideoUrl: () => string;
  getAuthorInfo: () => { avatar: string; nickname: string };
  getSafeFilename: () => string;
  onDownloadClick: (downloadUrl: string, filename: string) => void;
}

function MdResultSection(props: ResultSectionProps) {
  if (!props.data?.result) return null;

  const result = props.data.result;
  const thumbnail = result.thumbnail;
  const videoPreviewSrc = result.videoHD || result.videoSD || props.getVideoUrl();

  const generateFilename = (baseName: string, type: 'video' | 'audio' | 'watermark') => {
    let filename = (baseName || 'tiktok-video').trim();
    if (type === 'audio') filename += '_audio';
    if (type === 'watermark') filename += '_watermark';
    return filename;
  };

  return (
    <div class="mt-6 w-full max-w-4xl mx-auto px-4">
      <div class="relative rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4" style={{ minHeight: '340px' }}>
        
        {/* Background Image */}
        {thumbnail && (
          <>
            <img 
              src={thumbnail} 
              alt="background" 
              class="absolute inset-0 w-full h-full object-cover blur-sm" 
              style={{ zIndex: 0 }} 
            />
            <div class="absolute inset-0 bg-rose-950/90" style={{ zIndex: 1 }} />
          </>
        )}

        <div class="relative z-10 flex flex-col md:flex-row gap-4">
          {/* Video Player */}
          <div class="w-full md:w-48 aspect-[9/16] bg-black rounded-lg overflow-hidden shadow">
            <video controls poster={thumbnail} src={videoPreviewSrc} class="w-full h-full object-cover" />
          </div>

          {/* Info & Stats */}
          <div class="flex-1">
            <h3 class="text-lg font-bold text-white mb-2 line-clamp-2">
              {result.desc || "TikTok Video"}
            </h3>
            <p class="text-white/80 mb-4">By: {props.getAuthorInfo().nickname}</p>

            {/* Stats */}
            {(result.views || result.likes || result.comments || result.shares) && (
              <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm bg-white/10 p-3 rounded">
                {result.views && <Stat label="Views" value={result.views} />}
                {result.likes && <Stat label="Likes" value={result.likes} color="red" />}
                {result.comments && <Stat label="Comments" value={result.comments} color="green" />}
                {result.shares && <Stat label="Shares" value={result.shares} color="blue" />}
              </div>
            )}
          </div>

          {/* Download Buttons */}
          <div class="w-full md:w-64 flex flex-col gap-2">
            {result.videoSD && <DownloadBtn label="Download MP4 [1]" onClick={() => props.onDownloadClick(`https://dl.tiktokiocdn.workers.dev/api/download?url=${encodeURIComponent(result.videoSD)}&type=.mp4&title=${props.getSafeFilename()}`, generateFilename(props.getSafeFilename(), 'video'))} />}
            
            {result.videoWatermark && <DownloadBtn label="Download MP4 [2]" onClick={() => props.onDownloadClick(`https://dl.tiktokiocdn.workers.dev/api/download?url=${encodeURIComponent(result.videoWatermark)}&type=.mp4&title=${props.getSafeFilename()}`, generateFilename(props.getSafeFilename(), 'watermark'))} />}
            
            {(result.videoHD || result.video_hd) && <DownloadBtn label="Download HD" onClick={() => props.onDownloadClick(`https://dl.tiktokiocdn.workers.dev/api/download?url=${encodeURIComponent(result.videoHD || result.video_hd)}&type=.mp4&title=${props.getSafeFilename()}`, generateFilename(props.getSafeFilename(), 'video'))} />}
            
            {result.music && <DownloadBtn label="Download MP3" onClick={() => props.onDownloadClick(`https://dl.tiktokiocdn.workers.dev/api/download?url=${encodeURIComponent(result.music)}&type=.mp3&title=${props.getSafeFilename()}_audio`, generateFilename(props.getSafeFilename(), 'audio'))} />}

            <a href="/" class="mt-3 block w-full bg-black hover:bg-zinc-900 text-white text-center py-3 rounded text-sm font-medium transition">
              ← Download Another Video
            </a>
          </div>
        </div>

        {/* === YOUR NEW AD CODE HERE === */}
        <AdBanner
          scriptSrc="//zr.intortarguing.com/tzOodVa0qXn5/27065"
          containerId="main-result-ad"
          class="mt-6"
          height="280px"
        />
      </div>
    </div>
  );
}

// Helper Components
function Stat({ label, value, color = "gray" }: any) {
  return (
    <div class="flex items-center gap-1">
      <span class="text-white/70 text-xs">{label}</span>
      <span class="font-semibold text-white">{Number(value).toLocaleString()}</span>
    </div>
  );
}

function DownloadBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      class="w-full bg-[#FF9800] hover:bg-amber-600 active:bg-amber-700 text-white font-medium py-3 px-4 rounded flex items-center justify-center gap-2 transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {label}
    </button>
  );
}

export default MdResultSection;