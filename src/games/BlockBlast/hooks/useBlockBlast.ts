import { useState, useEffect, useCallback } from "react";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINOES,
  INITIAL_SPEED,
  MIN_SPEED,
  SPEED_DECREMENT,
  SCORES,
  ShapeDefinition,
} from "../constants";

export interface BoardCell {
  filled: boolean;
  color: string;
  glowColor: string;
}

export type BoardMatrix = (BoardCell | null)[][];

export interface PieceState {
  shape: number[][];
  color: string;
  glowColor: string;
  x: number;
  y: number;
  name: string;
}

const getRandomPiece = (): ShapeDefinition => {
  const keys = Object.keys(TETROMINOES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOES[randomKey];
};

const createEmptyBoard = (): BoardMatrix =>
  Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );

export function useBlockBlast() {
  const [board, setBoard] = useState<BoardMatrix>(createEmptyBoard);
  const [nextPiece, setNextPiece] = useState<ShapeDefinition>(getRandomPiece);
  const [currentPiece, setCurrentPiece] = useState<PieceState | null>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem("block_blast_high_score");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [clearingRows, setClearingRows] = useState<number[]>([]);

  // Helper to spawn piece
  const spawnPiece = useCallback(
    (pieceToSpawn: ShapeDefinition, upcomingPiece: ShapeDefinition) => {
      const startX = Math.floor(
        (BOARD_WIDTH - pieceToSpawn.shape[0].length) / 2
      );
      const startY = 0;

      const newPiece: PieceState = {
        shape: pieceToSpawn.shape,
        color: pieceToSpawn.color,
        glowColor: pieceToSpawn.glowColor,
        x: startX,
        y: startY,
        name: pieceToSpawn.name,
      };

      // Check immediate game over
      for (let r = 0; r < newPiece.shape.length; r++) {
        for (let c = 0; c < newPiece.shape[r].length; c++) {
          if (newPiece.shape[r][c]) {
            const boardRow = startY + r;
            const boardCol = startX + c;
            if (
              boardRow >= 0 &&
              boardRow < BOARD_HEIGHT &&
              board[boardRow][boardCol] !== null
            ) {
              setIsGameOver(true);
              return;
            }
          }
        }
      }

      setCurrentPiece(newPiece);
      setNextPiece(upcomingPiece);
    },
    [board]
  );

  // Initialize first piece
  useEffect(() => {
    if (!currentPiece && !isGameOver) {
      const firstPiece = getRandomPiece();
      const secondPiece = getRandomPiece();
      spawnPiece(firstPiece, secondPiece);
    }
  }, [currentPiece, isGameOver, spawnPiece]);

  // Check collision
  const checkCollision = useCallback(
    (
      piece: PieceState,
      currentBoard: BoardMatrix,
      offsetX = 0,
      offsetY = 0,
      newShape?: number[][]
    ): boolean => {
      const shape = newShape || piece.shape;
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (shape[r][c]) {
            const nextX = piece.x + c + offsetX;
            const nextY = piece.y + r + offsetY;

            if (nextX < 0 || nextX >= BOARD_WIDTH || nextY >= BOARD_HEIGHT) {
              return true; // Wall collision
            }

            if (nextY >= 0 && currentBoard[nextY][nextX] !== null) {
              return true; // Block collision
            }
          }
        }
      }
      return false;
    },
    []
  );

  // Lock piece into board & handle line clear
  const lockPiece = useCallback(() => {
    if (!currentPiece) return;

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);

      // Lock current piece
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
          if (currentPiece.shape[r][c]) {
            const boardRow = currentPiece.y + r;
            const boardCol = currentPiece.x + c;
            if (boardRow >= 0 && boardRow < BOARD_HEIGHT) {
              newBoard[boardRow][boardCol] = {
                filled: true,
                color: currentPiece.color,
                glowColor: currentPiece.glowColor,
              };
            }
          }
        }
      }

      // Check completed lines
      const fullRowIndices: number[] = [];
      for (let r = 0; r < BOARD_HEIGHT; r++) {
        if (newBoard[r].every((cell) => cell !== null)) {
          fullRowIndices.push(r);
        }
      }

      if (fullRowIndices.length > 0) {
        setClearingRows(fullRowIndices);

        setTimeout(() => {
          setBoard((b) => {
            const filteredBoard = b.filter(
              (_, index) => !fullRowIndices.includes(index)
            );
            const emptyRows = Array.from({ length: fullRowIndices.length }, () =>
              Array.from({ length: BOARD_WIDTH }, () => null)
            );
            return [...emptyRows, ...filteredBoard];
          });

          setClearingRows([]);
        }, 200);

        // Update score & level
        const clearedCount = fullRowIndices.length;
        let linePoints = 0;
        if (clearedCount === 1) linePoints = SCORES.SINGLE;
        else if (clearedCount === 2) linePoints = SCORES.DOUBLE;
        else if (clearedCount === 3) linePoints = SCORES.TRIPLE;
        else if (clearedCount >= 4) linePoints = SCORES.BLAST;

        const comboMultiplier = combo + 1;
        const totalPoints = linePoints * comboMultiplier * level;

        setScore((prev) => {
          const newScore = prev + totalPoints;
          setHighScore((hs) => {
            if (newScore > hs) {
              localStorage.setItem("block_blast_high_score", newScore.toString());
              return newScore;
            }
            return hs;
          });
          return newScore;
        });

        setLines((l) => {
          const newLines = l + clearedCount;
          setLevel(Math.floor(newLines / 10) + 1);
          return newLines;
        });

        setCombo((c) => c + 1);
      } else {
        setCombo(0);
      }

      return newBoard;
    });

    // Spawn next piece
    const nextNext = getRandomPiece();
    spawnPiece(nextPiece, nextNext);
  }, [currentPiece, nextPiece, spawnPiece, level, combo]);

  // Drop down 1 unit
  const drop = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused || clearingRows.length > 0) return;

    if (!checkCollision(currentPiece, board, 0, 1)) {
      setCurrentPiece((prev) => (prev ? { ...prev, y: prev.y + 1 } : null));
    } else {
      lockPiece();
    }
  }, [currentPiece, board, isGameOver, isPaused, clearingRows, checkCollision, lockPiece]);

  // Soft drop
  const softDrop = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused) return;
    if (!checkCollision(currentPiece, board, 0, 1)) {
      setCurrentPiece((prev) => (prev ? { ...prev, y: prev.y + 1 } : null));
      setScore((s) => s + SCORES.SOFT_DROP);
    } else {
      lockPiece();
    }
  }, [currentPiece, board, isGameOver, isPaused, checkCollision, lockPiece]);

  // Hard drop
  const hardDrop = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused) return;

    let dropDistance = 0;
    while (!checkCollision(currentPiece, board, 0, dropDistance + 1)) {
      dropDistance++;
    }

    if (dropDistance > 0) {
      setCurrentPiece((prev) =>
        prev ? { ...prev, y: prev.y + dropDistance } : null
      );
      setScore((s) => s + dropDistance * SCORES.HARD_DROP);
    }
    // Lock piece in next frame
    setTimeout(() => {
      lockPiece();
    }, 10);
  }, [currentPiece, board, isGameOver, isPaused, checkCollision, lockPiece]);

  // Move left/right
  const moveLeft = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused) return;
    if (!checkCollision(currentPiece, board, -1, 0)) {
      setCurrentPiece((prev) => (prev ? { ...prev, x: prev.x - 1 } : null));
    }
  }, [currentPiece, board, isGameOver, isPaused, checkCollision]);

  const moveRight = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused) return;
    if (!checkCollision(currentPiece, board, 1, 0)) {
      setCurrentPiece((prev) => (prev ? { ...prev, x: prev.x + 1 } : null));
    }
  }, [currentPiece, board, isGameOver, isPaused, checkCollision]);

  // Rotate shape matrix clockwise
  const rotate = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused) return;

    const oldShape = currentPiece.shape;
    const rows = oldShape.length;
    const cols = oldShape[0].length;
    const rotatedShape: number[][] = Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () => 0)
    );

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        rotatedShape[c][rows - 1 - r] = oldShape[r][c];
      }
    }

    // Try rotation directly or with wall kick (offsets: 0, -1, 1, -2, 2)
    const offsets = [0, -1, 1, -2, 2];
    for (const offset of offsets) {
      if (!checkCollision(currentPiece, board, offset, 0, rotatedShape)) {
        setCurrentPiece((prev) =>
          prev
            ? {
                ...prev,
                shape: rotatedShape,
                x: prev.x + offset,
              }
            : null
        );
        return;
      }
    }
  }, [currentPiece, board, isGameOver, isPaused, checkCollision]);

  // Calculate Ghost position
  const getGhostY = useCallback((): number => {
    if (!currentPiece) return 0;
    let ghostY = currentPiece.y;
    while (!checkCollision(currentPiece, board, 0, ghostY - currentPiece.y + 1)) {
      ghostY++;
    }
    return ghostY;
  }, [currentPiece, board, checkCollision]);

  // Game Loop interval
  useEffect(() => {
    if (isGameOver || isPaused || clearingRows.length > 0) return;

    const currentSpeed = Math.max(
      MIN_SPEED,
      INITIAL_SPEED - (level - 1) * SPEED_DECREMENT
    );

    const interval = setInterval(() => {
      drop();
    }, currentSpeed);

    return () => clearInterval(interval);
  }, [drop, level, isGameOver, isPaused, clearingRows]);

  // Restart
  const restart = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLines(0);
    setLevel(1);
    setCombo(0);
    setIsGameOver(false);
    setIsPaused(false);
    setClearingRows([]);
    setCurrentPiece(null);
    const p1 = getRandomPiece();
    const p2 = getRandomPiece();
    spawnPiece(p1, p2);
  }, [spawnPiece]);

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  return {
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
    ghostY: getGhostY(),
    moveLeft,
    moveRight,
    rotate,
    drop: softDrop,
    hardDrop,
    restart,
    togglePause,
  };
}
