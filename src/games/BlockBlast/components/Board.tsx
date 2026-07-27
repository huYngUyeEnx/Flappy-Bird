import React from "react";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../constants";
import { BoardMatrix, PieceState } from "../hooks/useBlockBlast";

interface BoardProps {
  board: BoardMatrix;
  currentPiece: PieceState | null;
  ghostY: number;
  clearingRows: number[];
}

export const Board: React.FC<BoardProps> = ({
  board,
  currentPiece,
  ghostY,
  clearingRows,
}) => {
  // Render grid cell helper
  const renderCell = (r: number, c: number) => {
    const isClearing = clearingRows.includes(r);

    // 1. Check if occupied by current piece
    if (currentPiece) {
      const pieceR = r - currentPiece.y;
      const pieceC = c - currentPiece.x;
      if (
        pieceR >= 0 &&
        pieceR < currentPiece.shape.length &&
        pieceC >= 0 &&
        pieceC < currentPiece.shape[pieceR].length &&
        currentPiece.shape[pieceR][pieceC]
      ) {
        return (
          <div
            key={`${r}-${c}`}
            className={`w-full h-full rounded-[4px] bg-gradient-to-br ${currentPiece.color} border border-white/40 shadow-lg shadow-black/40 transition-all duration-75 scale-95`}
            style={{
              boxShadow: `0 0 10px ${currentPiece.glowColor}aa`,
            }}
          />
        );
      }

      // 2. Check if occupied by ghost piece
      const ghostR = r - ghostY;
      if (
        ghostR >= 0 &&
        ghostR < currentPiece.shape.length &&
        pieceC >= 0 &&
        pieceC < currentPiece.shape[ghostR].length &&
        currentPiece.shape[ghostR][pieceC]
      ) {
        return (
          <div
            key={`${r}-${c}`}
            className="w-full h-full rounded-[4px] border-2 border-dashed border-zinc-400/50 bg-zinc-500/10 scale-90"
          />
        );
      }
    }

    // 3. Check placed board cell
    const cell = board[r][c];
    if (cell) {
      return (
        <div
          key={`${r}-${c}`}
          className={`w-full h-full rounded-[4px] bg-gradient-to-br ${cell.color} border border-white/30 shadow-md ${
            isClearing ? "animate-pulse bg-white border-cyan-200" : ""
          }`}
          style={{
            boxShadow: isClearing
              ? "0 0 20px #ffffff"
              : `0 0 8px ${cell.glowColor}66`,
          }}
        />
      );
    }

    // 4. Empty grid square
    return (
      <div
        key={`${r}-${c}`}
        className="w-full h-full border border-zinc-800/40 bg-zinc-950/40 rounded-[2px]"
      />
    );
  };

  return (
    <div className="relative p-2 md:p-3 bg-zinc-900/90 rounded-2xl border border-zinc-800 backdrop-blur-xl shadow-2xl shadow-black/80">
      <div
        className="grid gap-[2px] bg-zinc-950 p-2 rounded-xl border border-zinc-800/80 shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, minmax(0, 1fr))`,
          width: "min(85vw, 320px)",
          height: "min(170vw, 640px)",
        }}
      >
        {Array.from({ length: BOARD_HEIGHT }).map((_, r) =>
          Array.from({ length: BOARD_WIDTH }).map((_, c) => renderCell(r, c))
        )}
      </div>
    </div>
  );
};
