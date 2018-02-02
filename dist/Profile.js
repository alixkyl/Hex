"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.profileIsland = [
    [island, island, island, island],
    [island, island, island, island],
    [island, island, island, island],
    [island, island, island, island]
];
exports.profileDefault = [
    [cornerLR, cornerLL],
    [cornerUR, cornerUL]
];
//# sourceMappingURL=Profile.js.map