import React, { useState } from "react";

const GameOver = ({ score, onRestart }: { score: number; onRestart: () => void }) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const shareTitle = "Space Odyssey React";
  const shareText = `🚀 Tôi vừa bay được ${score} parsecs trong Space Odyssey! Thử thách bạn vượt qua tôi đấy!`;
  const shareUrl = window.location.href;

  const handleShare = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Ngăn sự kiện restart game ngoài ý muốn

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopyStatus("Đã sao chép link chia sẻ!");
        setTimeout(() => setCopyStatus(null), 2000);
      } catch (err) {
        alert("Không thể sao chép liên kết");
      }
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm z-50 text-center animate-in fade-in duration-500">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-5xl font-black mb-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.4)] tracking-widest uppercase">
        System Failure
      </h2>

      {/* Glassmorphism Panel */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,255,255,0.1)] mb-8 transform transition-all hover:scale-105">
        <p className="text-cyan-400 text-sm uppercase font-bold tracking-[0.3em] mb-2 opacity-80">
          Distance Traveled
        </p>
        <p className="text-white text-7xl font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] font-mono">{score}</p>
      </div>

      <div className="flex flex-col gap-4 w-64">
        {/* Nút Play Again */}
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] active:scale-95 transition-all uppercase tracking-wider border border-cyan-400/50"
        >
          Reboot System
        </button>

        {/* Nút Share có gán logic handleShare */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-cyan-100 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-white/10 active:scale-95 transition-all backdrop-blur-md relative uppercase tracking-widest"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.681-1.689l-4.94-2.47a3.033 3.033 0 000-.638l4.94-2.47A3 3 0 0015 8z" />
          </svg>
          Transceive Data
          {/* Toast thông báo đã sao chép */}
          {copyStatus && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-cyan-900/90 border border-cyan-400 text-cyan-100 text-xs py-2 px-4 rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.5)] animate-in slide-in-from-bottom duration-300 whitespace-nowrap">
              {copyStatus}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default GameOver;
