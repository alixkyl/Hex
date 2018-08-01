const island = [
    [-0.5, -0.5, -0.5, -0.5, -0.5],
    [-0.5, 0, 0, 0, -0.5],
    [-0.5, 0, 1, 0, -0.5],
    [-0.5, 0, 0, 0, -0.5],
    [-0.5, -0.5, -0.5, -0.5, -0.5],
];
const cornerLL = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [1, 1, -1, -1, -1],
    [1, 1, 1, -1, -1],
    [1, 1, 1, -1, -1],
];
const cornerUL = [
    [1, 1, 1, -1, -1],
    [1, 1, 1, -1, -1],
    [1, 1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
];
const cornerLR = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, 1, 1],
    [-1, -1, 1, 1, 1],
    [-1, -1, 1, 1, 1],
];
const cornerUR = [
    [-1, -1, 1, 1, 1],
    [-1, -1, 1, 1, 1],
    [-1, -1, -1, 1, 1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
];
export let profileIsland = [
    [island, island, island, island],
    [island, island, island, island],
    [island, island, island, island],
    [island, island, island, island],
];
export let profileDefault = [
    [cornerLR, cornerLL],
    [cornerUR, cornerUL],
];
//# sourceMappingURL=Profile.js.map