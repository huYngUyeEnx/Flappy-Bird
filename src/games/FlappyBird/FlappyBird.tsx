import React, { useState, useEffect, useRef } from "react";
import Bird from "./components/Bird";
import Pipe from "./components/Pipe";
import GameOver from "./components/GameOver";
import useBird from "./hooks/useBird";
import usePipes from "./hooks/usePipes";
import useBackground from "./hooks/useBackground";
import useGameLoop from "./hooks/useGameLoop";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  BIRD_SIZE,
  BIRD_START_X,
  PIPE_WIDTH,
  PIPE_GAP,
} from "./constants";
import spaceBg from "../../icon/videoframe_2207.png";

/**
 * Component chính điều phối toàn bộ logic và giao diện Game
 */
function FlappyBird() {
  // gameState: Trạng thái hiện tại của game
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');

  // score: Điểm số hiện tại của người chơi
  const [score, setScore] = useState(0);

  // rage: Thanh năng lượng / nộ (0 - 100)
  const [rage, setRage] = useState(0);

  // isInvincible: Trạng thái xuyên cột khi giữ chuột/màn hình
  const [isInvincible, setIsInvincible] = useState(false);

  // isShaking: Trạng thái rung màn hình
  const [isShaking, setIsShaking] = useState(false);

  // activeInvincible: Chỉ bật khiên khi đang giữ chuột VÀ còn năng lượng
  const activeInvincible = isInvincible && rage > 0;

  // Các custom hooks để quản lý riêng biệt Bird và Pipes
  const { y, velocity, update: updateBird, jump, reset: resetBird } = useBird();
  const { pipes, update: updatePipes, reset: resetPipes, shatterPipe } = usePipes();
  const {
    cityOffset,
    cloudOffset,
    update: updateBG,
    reset: resetBG,
  } = useBackground();

  // passedPipes: Lưu trữ ID các ống đã vượt qua để tính điểm một lần duy nhất mỗi ống
  const passedPipes = useRef<Set<any>>(new Set());

  // scale: Tỷ lệ co giãn để vừa với màn hình Mobile
  const [scale, setScale] = useState(1);

  // Tính toán lại tỷ lệ khi màn hình thay đổi
  useEffect(() => {
    const calcScale = () => {
      const padding = 20; // Chừa lề một chút
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - padding;

      const widthScale = availableWidth / GAME_WIDTH;
      const heightScale = availableHeight / GAME_HEIGHT;

      // Chọn tỷ lệ nhỏ hơn để đảm bảo khung game luôn nằm trọn trong màn hình
      const newScale = Math.min(widthScale, heightScale, 1);
      setScale(newScale);
    };

    calcScale();
    window.addEventListener("resize", calcScale);
    return () => window.removeEventListener("resize", calcScale);
  }, []);

  /**
   * Vòng lặp chính của Game (chạy 60 lần/giây)
   */
  useGameLoop((delta: number) => {
    if (gameState === 'playing') {
      const time = performance.now();
      updateBird(delta, activeInvincible); // Cập nhật vị trí chim với delta và cờ tàng hình (chỉ khi còn năng lượng)
      updatePipes(delta, time); // Cập nhật vị trí các ống với delta và time
      updateBG(delta); // Cập nhật vị trí nền với delta

      // Trừ dần năng lượng nếu đang sử dụng khiên
      if (activeInvincible) {
        setRage((prev) => Math.max(prev - 0.4 * delta, 0)); // Trừ từ từ theo frame
      }

      // 1. Kiểm tra va chạm với nền đất (chiều cao 40px)
      if (y + BIRD_SIZE > GAME_HEIGHT - 40) {
        setGameState('gameover');
      }

      // 2. Kiểm tra va chạm với từng cặp ống nước
      pipes.forEach((pipe) => {
        const birdRight = BIRD_START_X + BIRD_SIZE;
        const birdLeft = BIRD_START_X;
        const birdTop = y;
        const birdBottom = y + BIRD_SIZE;

        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + PIPE_WIDTH;
        const pipeTopHeight = pipe.topHeight;
        const pipeBottomY = pipe.topHeight + PIPE_GAP;

        // Logic va chạm hình hộp (AABB Collision)
        if (
          birdRight > pipeLeft &&
          birdLeft < pipeRight &&
          (birdTop < pipeTopHeight || birdBottom > pipeBottomY)
        ) {
          if (activeInvincible) {
            // Khiên bật (còn năng lượng): Húc vỡ cột và rung màn hình
            if (!pipe.isShattered) {
              shatterPipe(pipe.id);
              setIsShaking(true);
              setTimeout(() => setIsShaking(false), 200); // Tắt rung sau 200ms
            }
          } else if (!pipe.isShattered) {
            // Không có khiên và cột chưa vỡ -> Chết
            setGameState('gameover');
          }
        }

        // 3. Tính điểm: Nếu chim vượt qua cạnh phải của ống và chưa được tính điểm
        if (pipeRight < birdLeft && !passedPipes.current.has(pipe.id)) {
          setScore((prev) => prev + 1);
          if (!pipe.isShattered) {
            setRage((prev) => Math.min(prev + 14, 100)); // Chỉ tăng nộ khi lách qua cột nguyên vẹn
          }
          passedPipes.current.add(pipe.id);
        }
      });
    }
  }, gameState === 'playing');

  /**
   * Reset trạng thái để bắt đầu ván mới (chỉ gọi khi ấn nút Reboot System)
   */
  const handleRestart = () => {
    setGameState('idle');
    setScore(0);
    setRage(0);
    passedPipes.current.clear();
    resetBird();
    resetPipes();
    resetBG();
  };

  /**
   * Xử lý click chuột hoặc gõ phím để Nhảy
   */
  const handleAction = () => {
    // Nếu game kết thúc -> Không làm gì cả (bắt buộc ấn nút)
    if (gameState === 'gameover') {
      return;
    }

    // Bắt đầu game nếu đang ở màn hình chờ
    if (gameState === 'idle') {
      setGameState('playing');
    }

    // Chim nhảy lên
    jump();
  };

  /**
   * Lắng nghe sự kiện phím cách (Space) từ bàn phím
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (!e.repeat) handleAction(); // Chỉ nhảy 1 lần khi ấn
        setIsInvincible(true); // Bật khiên năng lượng
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsInvincible(false); // Tắt khiên khi nhả phím
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-slate-900 select-none overflow-hidden touch-none ${isShaking ? 'animate-[shake_0.2s_ease-in-out_infinite]' : ''}`}
      onPointerDown={() => {
        handleAction();
        setIsInvincible(true);
      }}
      onPointerUp={() => setIsInvincible(false)}
      onPointerLeave={() => setIsInvincible(false)}
      onPointerCancel={() => setIsInvincible(false)}
    >
      <div
        className="relative overflow-hidden bg-slate-950 shadow-[0_0_50px_rgba(0,255,255,0.2)] transition-transform duration-300"
        style={{
          width: `${GAME_WIDTH}px`,
          height: `${GAME_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          borderRadius: scale < 1 ? "0" : "1rem", // Tràn viền trên Mobile, bo góc trên PC
        }}
      >
        <style>
          {`
            @keyframes panBg {
              0% { transform: scale(1.1) translate(0, 0); }
              50% { transform: scale(1.2) translate(-5%, 5%); }
              100% { transform: scale(1.1) translate(0, 0); }
            }
            @keyframes stars {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
            @keyframes shake {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(-10px, 10px) rotate(-2deg); }
              50% { transform: translate(10px, -10px) rotate(2deg); }
              75% { transform: translate(-10px, -10px) rotate(-2deg); }
            }
          `}
        </style>

        {/* Deep Space Background (Nền cơ sở) */}
        <div className="absolute inset-0 bg-slate-950"></div>

        {/* Ảnh nền có hiệu ứng chuyển động trôi (Pan) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={spaceBg}
            alt="Space"
            className="w-full h-full object-cover opacity-70 mix-blend-screen animate-[panBg_20s_ease-in-out_infinite]"
          />
        </div>

        {/* Lớp sao vụn lướt qua (Starfield cũ) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
          <div className="absolute top-0 w-full h-[200%] flex flex-col" style={{ animation: 'stars 20s linear infinite' }}>
            <div className="flex-1 w-full bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_transparent_2px)] bg-[size:30px_30px]" style={{ backgroundPosition: '0 0, 15px 15px' }}></div>
          </div>
        </div>
        {/* Thanh nộ (Energy Bar) */}
        <div className="absolute top-4 left-4 z-50 flex flex-col gap-1">
          <span className="text-cyan-400 text-[10px] uppercase font-bold tracking-widest drop-shadow-md">
            Energy
          </span>
          <div className="w-32 h-3 bg-slate-900/80 border border-cyan-500/50 rounded-full overflow-hidden shadow-[0_0_10px_rgba(0,255,255,0.2)]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,255,0.8)]"
              style={{ width: `${rage}%` }}
            ></div>
          </div>
        </div>

        {/* Lớp hiển thị Điểm số HUD */}
        <div className="absolute top-10 w-full text-center z-50">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-600 text-6xl font-black drop-shadow-[0_0_15px_rgba(0,255,255,0.6)] font-mono">
            {score}
          </span>
        </div>

        {/* Màn hình Hướng dẫn (Chỉ hiện khi chưa bắt đầu) */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-50 text-center">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-4xl font-black mb-4 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] uppercase tracking-[0.3em]">
              Space Odyssey
            </p>
            <p className="text-cyan-200 text-xl animate-pulse font-mono tracking-widest">
              Click or Space to Ignite
            </p>
          </div>
        )}

        {/* Màn hình Thua cuộc */}
        {gameState === 'gameover' && <GameOver score={score} onRestart={handleRestart} />}

        {/* Vẽ các Ống nước rà soát qua mảng pipes */}
        {pipes.map((pipe) => (
          <Pipe key={pipe.id} x={pipe.x} topHeight={pipe.topHeight} isShattered={pipe.isShattered} />
        ))}

        {/* Vẽ Chú chim */}
        <Bird top={y} velocity={velocity} isInvincible={activeInvincible} />

        {/* Lưới năng lượng (Nền đất) */}
        <div
          className="absolute bottom-0 w-full bg-slate-950 border-t-2 border-cyan-500 z-30 shadow-[0_-5px_20px_rgba(0,255,255,0.3)]"
          style={{ height: "40px" }}
        >
          {/* Lưới perspective ảo ảnh */}
          <div className="w-full h-full bg-[linear-gradient(to_right,#00ffff33_1px,transparent_1px)] bg-[size:20px_100%] opacity-30"></div>
          <div className="absolute top-0 w-full h-full bg-gradient-to-b from-cyan-500/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default FlappyBird;
