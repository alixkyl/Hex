let island = [
    [-0.5, -0.5, -0.5, -0.5, -0.5],
    [-0.5, 0, 0, 0, -0.5],
    [-0.5, 0, 1, 0, -0.5],
    [-0.5, 0, 0, 0, -0.5],
    [-0.5, -0.5, -0.5, -0.5, -0.5]
];
let cornerLL = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [1, 1, -1, -1, -1],
    [1, 1, 1, -1, -1],
    [1, 1, 1, -1, -1]
];
let cornerUL = [
    [1, 1, 1, -1, -1],
    [1, 1, 1, -1, -1],
    [1, 1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1]
];
let cornerLR = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, 1, 1],
    [-1, -1, 1, 1, 1],
    [-1, -1, 1, 1, 1]
];
let cornerUR = [
    [-1, -1, 1, 1, 1],
    [-1, -1, 1, 1, 1],
    [-1, -1, -1, 1, 1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1]
];
export let profileIsland = [
    [island, island, island, island],
    [island, island, island, island],
    [island, island, island, island],
    [island, island, island, island]
];
export let profileDefault = [
    [cornerLR, cornerLL],
    [cornerUR, cornerUL]
];
//# sourceMappingURL=Profile.js.map