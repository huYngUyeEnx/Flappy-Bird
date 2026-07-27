import React from "react";
import { BIRD_SIZE } from "../constants";

interface BirdProps {
  top: number;
  velocity?: number;
  isInvincible?: boolean;
}

const Bird = ({ top, velocity = 0, isInvincible = false }: BirdProps) => {
  const rotation = Math.min(Math.max(velocity * 4, -20), 90);

  // Khi bay lên (velocity âm), lửa phun dài và sáng hơn
  const isJumping = velocity < 0;

  return (
    <div
      className="absolute z-40 flex items-center justify-center"
      style={{
        top: `${top}px`,
        left: "50px",
        width: `${BIRD_SIZE}px`,
        height: `${BIRD_SIZE}px`,
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Jet Engine Flame (Lửa phản lực Plasma) */}
      <div
        className={`absolute -left-6 top-1/2 -translate-y-1/2 h-3 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-blue-200 blur-[1px] transition-all duration-150 ease-out ${isJumping ? 'w-14 opacity-100' : 'w-6 opacity-40'}`}
        style={{
          boxShadow: isJumping ? '-5px 0 15px rgba(0, 255, 255, 0.8)' : 'none',
        }}
      ></div>

      {/* Force Field (Khiên năng lượng khi giữ chuột) */}
      {isInvincible && (
        <div className="absolute inset-0 -m-2 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.8)] animate-pulse mix-blend-screen bg-cyan-400/20"></div>
      )}

      {/* Spaceship Body */}
      <div className="relative w-full h-full bg-gradient-to-r from-slate-200 to-white rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.6)]">
        {/* Cockpit Window */}
        <div className="absolute top-1 right-2 w-5 h-4 bg-gradient-to-br from-cyan-300 to-blue-600 rounded-full shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]"></div>
        {/* Wing/Fin Bottom */}
        <div className="absolute -bottom-1 left-2 w-5 h-4 bg-slate-600 skew-x-12 rounded-sm border-b-2 border-slate-800"></div>
        {/* Wing/Fin Top */}
        <div className="absolute -top-1 left-2 w-5 h-4 bg-slate-600 -skew-x-12 rounded-sm border-t-2 border-slate-800"></div>
        {/* Thruster Engine */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-3 h-4 bg-slate-800 rounded-sm"></div>
      </div>
    </div>
  );
};

export default Bird;
