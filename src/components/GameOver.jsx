import React, { useState } from 'react';

/**
 * Component hiển thị khi Game Over với tính năng chia sẻ điểm số
 * @param {number} score - Điểm số đạt được
 * @param {function} onRestart - Hàm xử lý khi nhấn chơi lại
 */
const GameOver = ({ score, onRestart }) => {
    const [copyStatus, setCopyStatus] = useState(null);

    const shareTitle = 'Flappy Bird React';
    const shareText = `🎮 Tôi vừa ghi được ${score} điểm trong Flappy Bird! Thử thách bạn vượt qua tôi đấy!`;
    const shareUrl = window.location.href;

    /**
     * Xử lý chia sẻ sử dụng Web Share API hoặc Fallback sao chép vào Clipboard
     */
    const handleShare = async (e) => {
        e.stopPropagation(); // Ngăn sự kiện restart game ngoài ý muốn

        if (navigator.share) {
            // Trường hợp trình duyệt hỗ trợ Web Share API (thường là Mobile)
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        } else {
            // Trường hợp Fallback: Sao chép vào Clipboard (thường là PC)
            try {
                await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
                setCopyStatus('Đã sao chép link chia sẻ!');
                // Reset thông báo sau 2 giây
                setTimeout(() => setCopyStatus(null), 2000);
            } catch (err) {
                alert('Không thể sao chép liên kết');
            }
        }
    };

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/40 z-50 text-center animate-in fade-in duration-500">
            <h2 className="text-white text-5xl font-black mb-2 drop-shadow-lg tracking-tight">GAME OVER</h2>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl mb-6 transform transition-all hover:scale-105">
                <p className="text-slate-600 text-sm uppercase font-bold tracking-widest mb-1">Điểm của bạn</p>
                <p className="text-slate-900 text-6xl font-black">{score}</p>
            </div>

            <div className="flex flex-col gap-3 w-64">
                {/* Nút Play Again */}
                <button
                    onClick={onRestart}
                    className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-50 active:scale-95 transition-all"
                >
                    Chơi lại
                </button>

                {/* Nút Share có gán logic handleShare */}
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 bg-slate-900/80 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-900 active:scale-95 transition-all backdrop-blur-md relative"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.681-1.689l-4.94-2.47a3.033 3.033 0 000-.638l4.94-2.47A3 3 0 0015 8z" />
                    </svg>
                    Chia sẻ điểm số

                    {/* Toast thông báo đã sao chép */}
                    {copyStatus && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs py-2 px-4 rounded-lg shadow-xl animate-in slide-in-from-bottom duration-300">
                            {copyStatus}
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

export default GameOver;
