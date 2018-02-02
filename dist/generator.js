"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hex_1 = require("./Hex");
const layer_1 = require("./layer");
const Options_1 = require("./Options");
/**
 *
 */
class Generator {
    constructor(options) {
        this._options = new Options_1.Options(options);
        this._mapWidth = this._options.patchSize * this._options.patchX;
        this._mapHeight = this._options.patchSize * this._options.patchY;
        this._layers = [];
        this._layers.push(new layer_1.Layer(this._options.patchSize, Math.max(this._options.profile.length, this._options.profile[0].length), this._options.seed, this._options.profile));
        for (let d = 0; d < this._options.depth; d++) {
            let patchSize = this._options.patchSize * Math.pow(2, this._options.depth - d);
            this._layers.push(new layer_1.Layer(patchSize, Math.pow(2, d), this._options.seed));
        }
    }
    getUV(u, v) {
        return this._layers.reduce((accu, curr, index) => {
            return accu + curr.getUV(u, v) / Math.pow(2, index);
        }, 0);
    }
    getHeight(hex) {
        return Math.max(-1, Math.min(1, this.getUV(hex.j, hex.i)));
    }
    generate() {
        let mapData = [];
        let hex;
        for (let i = 0; i < this._mapWidth; i++) {
            for (let j = 0; j < this._mapHeight; j++) {
                hex = new Hex_1.Hex(i, j);
                hex.height = this.getHeight(hex) + this._options.landSea;
                mapData.push(hex);
            }
        }
        return mapData;
    }
}
exports.Generator = Generator;
;
//# sourceMappingURL=generator.js.map