import React from "react";
import { Link } from "react-router-dom";
import { ArrowClockwise, House, Trophy } from "@phosphor-icons/react";

interface GameOverProps {
  score: number;
  highScore: number;
  lines: number;
  level: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  score,
  highScore,
  lines,
  level,
  onRestart,
}) => {
  const isNewHighScore = score > 0 && score >= highScore;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl shadow-black text-center relative overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Glow Header FX */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/10">
            <Trophy size={28} weight="duotone" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            Game Over
          </h2>
          <p className="text-zinc-400 text-sm mb-6">
            The grid is filled! Excellent run.
          </p>

          {isNewHighScore && (
            <div className="mb-6 py-1.5 px-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase inline-block">
              🎉 New High Score!
            </div>
          )}

          {/* Stats Box */}
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 mb-6 grid grid-cols-3 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                SCORE
              </span>
              <p className="text-base font-bold font-mono text-white">
                {score.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                LINES
              </span>
              <p className="text-base font-bold font-mono text-amber-400">
                {lines}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                LEVEL
              </span>
              <p className="text-base font-bold font-mono text-cyan-400">
                {level}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onRestart}
              className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <ArrowClockwise size={18} weight="bold" />
              <span>Play Again</span>
            </button>
            <Link
              to="/"
              className="py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 border border-zinc-700/60"
            >
              <House size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
