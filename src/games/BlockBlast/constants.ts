export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export interface ShapeDefinition {
  shape: number[][];
  color: string;
  glowColor: string;
  name: string;
}

export const TETROMINOES: Record<string, ShapeDefinition> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "from-cyan-400 to-cyan-600 border-cyan-300 shadow-cyan-500/50",
    glowColor: "#22d3ee",
    name: "I",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "from-blue-500 to-blue-700 border-blue-400 shadow-blue-500/50",
    glowColor: "#3b82f6",
    name: "J",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "from-amber-400 to-amber-600 border-amber-300 shadow-amber-500/50",
    glowColor: "#f59e0b",
    name: "L",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "from-yellow-300 to-yellow-500 border-yellow-200 shadow-yellow-400/50",
    glowColor: "#facc15",
    name: "O",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "from-emerald-400 to-emerald-600 border-emerald-300 shadow-emerald-500/50",
    glowColor: "#10b981",
    name: "S",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "from-purple-400 to-purple-600 border-purple-300 shadow-purple-500/50",
    glowColor: "#a855f7",
    name: "T",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "from-rose-400 to-rose-600 border-rose-300 shadow-rose-500/50",
    glowColor: "#f43f5e",
    name: "Z",
  },
  DOT: {
    shape: [[1]],
    color: "from-pink-400 to-pink-600 border-pink-300 shadow-pink-500/50",
    glowColor: "#ec4899",
    name: "DOT",
  },
  MINI_L: {
    shape: [
      [1, 0],
      [1, 1],
    ],
    color: "from-violet-400 to-violet-600 border-violet-300 shadow-violet-500/50",
    glowColor: "#8b5cf6",
    name: "MINI_L",
  },
};

export const INITIAL_SPEED = 800; // ms per drop tick
export const MIN_SPEED = 100;
export const SPEED_DECREMENT = 40; // decrease speed by 40ms per level

export const SCORES = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  BLAST: 800, // 4 lines clear
  SOFT_DROP: 1,
  HARD_DROP: 2,
};
