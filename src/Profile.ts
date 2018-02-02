let island:number[][]=[
    [-0.5,-0.5,-0.5,-0.5,-0.5],
    [-0.5, 0, 0, 0,-0.5],
    [-0.5, 0, 1, 0,-0.5],
    [-0.5, 0, 0, 0,-0.5],
    [-0.5,-0.5,-0.5,-0.5,-0.5]
];
let cornerLL:number[][]=[
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1],
    [1, 1, -1, -1, -1],
    [1,1,1,-1,-1],
    [1,1,1,-1,-1]
];
let cornerUL:number[][]=[
    [1,1,1,-1,-1],
    [1,1,1,-1,-1],
    [1,1,1,-1,-1],
    [1,1,-1,-1,-1],
    [-1,-1,-1,-1,-1]
];
let cornerUR:number[][]=[
    [-1,1,1,1,1],
    [-1,1,1,1,1],
    [-1,1,1,1,1],
    [-1,-1,1,1,1],
    [-1,-1,-1,-1,1]
];
let cornerLR:number[][]=[
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,1],
    [-1,-1,1,1,1],
    [-1,-1,1,1,1],
    [-1,1,1,1,1]
];
export let profileIsland: number[][][][] = [ 
    [island,island,island,island],
    [island,island,island,island],
    [island,island,island,island],
    [island,island,island,island]
];
export let profile: number[][][][] = [ 
    [cornerLR,cornerLL,island,island],
    [island,cornerUL,island,island],
    [island,island,island,island],
    [island,island,island,island]
];