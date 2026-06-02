import React from "react";
import { PIPE_WIDTH, PIPE_GAP, GAME_HEIGHT } from "../constants";

const Pipe = ({ x, topHeight, isShattered = false }: { x: number, topHeight: number, isShattered?: boolean }) => {
  const bottomHeight = GAME_HEIGHT - topHeight - PIPE_GAP - 40; // 40 là chiều cao ground

  // Hiệu ứng vỡ
  const shatteredClass = isShattered 
    ? "scale-150 opacity-0 blur-xl pointer-events-none transition-all duration-300 ease-out" 
    : "transition-none";

  return (
    <>
      {/* Top Pipe - Plasma Energy Pillar */}
      <div
        className={`absolute z-30 flex flex-col justify-end items-center ${shatteredClass}`}
        style={{
          left: `${x}px`,
          top: 0,
          width: `${PIPE_WIDTH}px`,
          height: `${topHeight}px`,
        }}
      >
        {/* Lõi Laser */}
        <div className="w-[80%] h-full bg-gradient-to-b from-purple-900/80 via-purple-500/80 to-cyan-400/90 shadow-[0_0_20px_rgba(0,255,255,0.4)] border-x border-cyan-300/30"></div>
        {/* Đầu Emitter (Cap) */}
        <div className="w-full h-8 bg-slate-900 border-2 border-cyan-400 rounded-b-lg shadow-[0_5px_20px_rgba(0,255,255,0.7)] relative flex justify-center items-end pb-1">
          <div className="w-3/4 h-2 bg-cyan-200 rounded-full shadow-[0_0_10px_#fff]"></div>
        </div>
      </div>

      {/* Bottom Pipe - Plasma Energy Pillar */}
      <div
        className={`absolute z-30 flex flex-col justify-start items-center ${shatteredClass}`}
        style={{
          left: `${x}px`,
          bottom: "40px", // Đặt trên ground
          width: `${PIPE_WIDTH}px`,
          height: `${bottomHeight}px`,
        }}
      >
        {/* Đầu Emitter (Cap) */}
        <div className="w-full h-8 bg-slate-900 border-2 border-cyan-400 rounded-t-lg shadow-[0_-5px_20px_rgba(0,255,255,0.7)] relative flex justify-center items-start pt-1">
          <div className="w-3/4 h-2 bg-cyan-200 rounded-full shadow-[0_0_10px_#fff]"></div>
        </div>
        {/* Lõi Laser */}
        <div className="w-[80%] h-full bg-gradient-to-t from-purple-900/80 via-purple-500/80 to-cyan-400/90 shadow-[0_0_20px_rgba(0,255,255,0.4)] border-x border-cyan-300/30"></div>
      </div>
    </>
  );
};

export default Pipe;
