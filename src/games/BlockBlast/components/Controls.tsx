import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  CaretDoubleDown,
  ArrowClockwise,
} from "@phosphor-icons/react";

interface ControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onSoftDrop: () => void;
  onHardDrop: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onRotate,
  onSoftDrop,
  onHardDrop,
}) => {
  return (
    <div className="w-full max-w-[340px] flex flex-col items-center gap-3">
      {/* TOUCH CONTROLS */}
      <div className="grid grid-cols-5 gap-2 w-full">
        <button
          onClick={onMoveLeft}
          className="h-12 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-200 border border-zinc-800 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-black/40"
          aria-label="Move Left"
        >
          <ArrowLeft size={20} weight="bold" />
        </button>

        <button
          onClick={onMoveRight}
          className="h-12 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-200 border border-zinc-800 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-black/40"
          aria-label="Move Right"
        >
          <ArrowRight size={20} weight="bold" />
        </button>

        <button
          onClick={onRotate}
          className="h-12 bg-emerald-950/60 hover:bg-emerald-900/80 active:scale-95 text-emerald-400 border border-emerald-800/60 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-black/40"
          aria-label="Rotate"
        >
          <ArrowClockwise size={20} weight="bold" />
        </button>

        <button
          onClick={onSoftDrop}
          className="h-12 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-200 border border-zinc-800 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-black/40"
          aria-label="Soft Drop"
        >
          <ArrowDown size={20} weight="bold" />
        </button>

        <button
          onClick={onHardDrop}
          className="h-12 bg-cyan-950/60 hover:bg-cyan-900/80 active:scale-95 text-cyan-400 border border-cyan-800/60 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-black/40"
          aria-label="Hard Drop"
        >
          <CaretDoubleDown size={20} weight="bold" />
        </button>
      </div>

      {/* KEYBOARD GUIDE */}
      <div className="hidden md:flex justify-center items-center gap-4 text-[11px] text-zinc-500 font-mono pt-1">
        <span>← → Move</span>
        <span>↑ Rotate</span>
        <span>↓ Drop</span>
        <span>Space Hard Drop</span>
      </div>
    </div>
  );
};
