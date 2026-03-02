import React, { useState, useEffect } from 'react';
import Bird from './components/Bird';
import useBird from './hooks/useBird';
import useGameLoop from './hooks/useGameLoop';
import { GAME_WIDTH, GAME_HEIGHT, BIRD_SIZE } from './constants';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { y, update, jump, reset } = useBird();

  // Vòng lặp game
  useGameLoop(() => {
    if (gameStarted && !gameOver) {
      update();

      // Kiểm tra va chạm với đất
      if (y + BIRD_SIZE > GAME_HEIGHT) {
        setGameOver(true);
      }
    }
  }, gameStarted && !gameOver);

  // Xử lý click/phím cách để nhảy
  const handleAction = () => {
    if (gameOver) {
      setGameOver(false);
      setGameStarted(false);
      reset();
      return;
    }

    if (!gameStarted) {
      setGameStarted(true);
    }
    jump();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        handleAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, jump]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-slate-900 select-none"
      onClick={handleAction}
    >
      <div
        className="relative overflow-hidden bg-sky-300 border-4 border-slate-700 shadow-2xl cursor-pointer"
        style={{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }}
      >
        {/* Background Clouds (Simple) */}
        <div className="absolute top-20 left-10 w-20 h-8 bg-white/40 rounded-full blur-sm"></div>
        <div className="absolute top-40 left-60 w-24 h-10 bg-white/40 rounded-full blur-sm"></div>

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 z-10">
            <p className="text-white text-3xl font-bold mb-4 drop-shadow-lg">FLAPPY BIRD</p>
            <p className="text-white text-xl animate-bounce">Click or Space to Start</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/40 z-10">
            <p className="text-white text-4xl font-black mb-2 drop-shadow-lg">GAME OVER</p>
            <p className="text-white text-xl">Click to Restart</p>
          </div>
        )}

        <Bird top={y} />

        {/* Ground */}
        <div
          className="absolute bottom-0 w-full bg-orange-800 border-t-4 border-green-600"
          style={{ height: '40px' }}
        ></div>
      </div>
    </div>
  );
}

export default App;
