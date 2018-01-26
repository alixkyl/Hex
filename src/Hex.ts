export class Hex {
    i: number;
    j: number;
    q: number;
    r: number;
    height: number;
    altitude: number;
    constructor(i: number, j: number) {
        this.i = i;
        this.j = j;
        this.r = i;
        this.q = j - Math.floor(i / 2);
    }
}