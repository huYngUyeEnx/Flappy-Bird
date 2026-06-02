export interface Game {
  id: string;
  name: string;
  path: string;
  description: string;
  category: string;
  colSpan: string;
  image?: string;
}

export const games: Game[] = [
  {
    id: "flappy-bird",
    name: "Flappy Bird",
    path: "/flappy-bird",
    description: "A classic test of patience and timing.",
    category: "Arcade",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    image: "/flappy-bird-bg.png",
  },
  {
    id: "tetris",
    name: "Tetris",
    path: "#",
    description: "Falling blocks puzzle. (Coming Soon)",
    category: "Puzzle",
    colSpan: "col-span-1",
  },
  {
    id: "snake",
    name: "Snake",
    path: "#",
    description: "Eat, grow, survive. (Coming Soon)",
    category: "Arcade",
    colSpan: "col-span-1 md:col-span-3",
  },
];
