const island: number[][] = [
  [-0.5, -0.5, -0.5, -0.5, -0.5],
  [-0.5, 0, 0, 0, -0.5],
  [-0.5, 0, 1, 0, -0.5],
  [-0.5, 0, 0, 0, -0.5],
  [-0.5, -0.5, -0.5, -0.5, -0.5],
];
const cornerLL: number[][] = [
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1],
  [1, 1, -1, -1, -1],
  [1, 1, 1, -1, -1],
  [1, 1, 1, -1, -1],
];
const cornerUL: number[][] = [
  [1, 1, 1, -1, -1],
  [1, 1, 1, -1, -1],
  [1, 1, -1, -1, -1],
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1],
];
const cornerLR: number[][] = [
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, 1, 1],
  [-1, -1, 1, 1, 1],
  [-1, -1, 1, 1, 1],
];
const cornerUR: number[][] = [
  [-1, -1, 1, 1, 1],
  [-1, -1, 1, 1, 1],
  [-1, -1, -1, 1, 1],
  [-1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1],
];
export let profileIsland: number[][][][] = [
  [island, island, island, island],
  [island, island, island, island],
  [island, island, island, island],
  [island, island, island, island],
];
export let profileDefault: number[][][][] = [
  [cornerLR, cornerLL],
  [cornerUR, cornerUL],
];
