import React from "react";
import { ShapeDefinition } from "../constants";

interface NextPieceProps {
  nextPiece: ShapeDefinition;
  score: number;
  highScore: number;
  lines: number;
  level: number;
  combo: number;
}

export const NextPiece: React.FC<NextPieceProps> = ({
  nextPiece,
  score,
  highScore,
  lines,
  level,
  combo,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[220px]">
      {/* SCORE BOARD */}
      <div className="p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800 backdrop-blur-xl shadow-xl space-y-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
            SCORE
          </span>
          <p className="text-3xl font-medium tracking-tight text-white font-mono">
            {score.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-0.5">
              HIGH
            </span>
            <p className="text-sm font-mono text-emerald-400 font-medium">
              {highScore.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-0.5">
              LEVEL
            </span>
            <p className="text-sm font-mono text-cyan-400 font-medium">
              {level}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            LINES
          </span>
          <span className="text-sm font-mono text-amber-400 font-medium">
            {lines}
          </span>
        </div>

        {combo > 1 && (
          <div className="py-1 px-2.5 bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/30 rounded-lg text-center animate-bounce">
            <span className="text-xs font-semibold text-amber-300 tracking-wide uppercase">
              🔥 {combo}x COMBO!
            </span>
          </div>
        )}
      </div>

      {/* NEXT PIECE PREVIEW */}
      <div className="p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800 backdrop-blur-xl shadow-xl flex flex-col items-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-3 w-full text-left">
          NEXT BLOCK
        </span>
        <div className="w-24 h-24 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-center p-2 shadow-inner">
          <div
            className="grid gap-[2px]"
            style={{
              gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, minmax(0, 1fr))`,
            }}
          >
            {nextPiece.shape.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`w-5 h-5 rounded-[3px] ${
                    cell
                      ? `bg-gradient-to-br ${nextPiece.color} border border-white/30`
                      : "bg-transparent"
                  }`}
                  style={{
                    boxShadow: cell
                      ? `0 0 6px ${nextPiece.glowColor}aa`
                      : "none",
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
