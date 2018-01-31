"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hex {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.r = i;
        this.q = j - Math.floor(i / 2);
    }
}
exports.Hex = Hex;
//# sourceMappingURL=Hex.js.map