import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pause, Play, ArrowClockwise } from "@phosphor-icons/react";
import { useBlockBlast } from "./hooks/useBlockBlast";
import { Board } from "./components/Board";
import { NextPiece } from "./components/NextPiece";
import { Controls } from "./components/Controls";
import { GameOver } from "./components/GameOver";

export default function BlockBlast() {
  const {
    board,
    currentPiece,
    nextPiece,
    score,
    highScore,
    lines,
    level,
    combo,
    isGameOver,
    isPaused,
    clearingRows,
    ghostY,
    moveLeft,
    moveRight,
    rotate,
    drop,
    hardDrop,
    restart,
    togglePause,
  } = useBlockBlast();

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for game keys
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Space",
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
        ].includes(e.code)
      ) {
        e.preventDefault();
      }

      if (isGameOver) return;

      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          moveLeft();
          break;
        case "ArrowRight":
        case "KeyD":
          moveRight();
          break;
        case "ArrowUp":
        case "KeyW":
          rotate();
          break;
        case "ArrowDown":
        case "KeyS":
          drop();
          break;
        case "Space":
          hardDrop();
          break;
        case "KeyP":
          togglePause();
          break;
        case "KeyR":
          restart();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    moveLeft,
    moveRight,
    rotate,
    drop,
    hardDrop,
    togglePause,
    restart,
    isGameOver,
  ]);

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-zinc-50 font-sans flex flex-col justify-between p-4 md:p-8 select-none relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* HEADER */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between z-10 mb-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-3.5 py-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white text-sm font-medium transition-all backdrop-blur-md"
        >
          <ArrowLeft size={16} />
          <span>Home</span>
        </Link>

        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>BLOCK BLAST</span>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-md">
              ARCADE
            </span>
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={togglePause}
            className="p-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all backdrop-blur-md"
            title={isPaused ? "Resume (P)" : "Pause (P)"}
          >
            {isPaused ? <Play size={18} weight="fill" /> : <Pause size={18} weight="fill" />}
          </button>
          <button
            onClick={restart}
            className="p-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all backdrop-blur-md"
            title="Restart (R)"
          >
            <ArrowClockwise size={18} />
          </button>
        </div>
      </header>

      {/* MAIN GAME VIEW */}
      <main className="max-w-4xl mx-auto w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 z-10 my-auto">
        {/* GAME BOARD */}
        <div className="relative">
          <Board
            board={board}
            currentPiece={currentPiece}
            ghostY={ghostY}
            clearingRows={clearingRows}
          />

          {/* PAUSE OVERLAY */}
          {isPaused && !isGameOver && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20">
              <span className="text-3xl font-bold text-white tracking-widest mb-4 font-mono">
                PAUSED
              </span>
              <button
                onClick={togglePause}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                <Play size={18} weight="fill" />
                <span>Resume</span>
              </button>
            </div>
          )}
        </div>

        {/* SIDE PANEL: SCORE & NEXT PIECE */}
        <div className="flex flex-col items-center gap-6">
          <NextPiece
            nextPiece={nextPiece}
            score={score}
            highScore={highScore}
            lines={lines}
            level={level}
            combo={combo}
          />

          {/* CONTROLS FOR MOBILE & KEYBOARD HINTS */}
          <Controls
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            onRotate={rotate}
            onSoftDrop={drop}
            onHardDrop={hardDrop}
          />
        </div>
      </main>

      {/* GAME OVER MODAL */}
      {isGameOver && (
        <GameOver
          score={score}
          highScore={highScore}
          lines={lines}
          level={level}
          onRestart={restart}
        />
      )}
    </div>
  );
}
