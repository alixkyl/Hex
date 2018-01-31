"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hex_1 = require("./Hex");
const NurbGenerator_1 = require("./NurbGenerator");
const Profile_1 = require("./Profile");
const Options_1 = require("./Options");
/**
*HexMapGenerator
*/
class Generator {
    constructor(options) {
        this.options = new Options_1.Options(options);
        this.nurbsGenerator = new NurbGenerator_1.NurbsGenerator(this.options.seed, Profile_1.profile);
        this.PatchWidth = Math.floor(this.options.width / Profile_1.profile[0].length);
        this.PatchHeight = Math.floor(this.options.height / Profile_1.profile.length);
    }
    getHeight(hex) {
        var w = Math.floor(hex.j / this.PatchWidth);
        var h = Math.floor(hex.i / this.PatchHeight);
        var result = this.nurbsGenerator.getNurbsFunction(0, w, h, this.PatchWidth)((hex.j - w * this.PatchWidth), (hex.i - h * this.PatchHeight));
        for (var d = 1; d < this.options.degree; d++) {
            var impact = 1 / Math.pow(2, d);
            var size = this.options.patchSize * Math.pow(2, this.options.degree - d);
            w = Math.floor(hex.j / size);
            h = Math.floor(hex.i / size);
            result += this.nurbsGenerator.getNurbsFunction(d, w, h, size)((hex.j - w * size), (hex.i - h * size));
        }
        return Math.max(-1, Math.min(1, result));
    }
    generate() {
        var mapData = [];
        var hex;
        for (var i = 0; i < this.options.height; i++) {
            for (var j = 0; j < this.options.width; j++) {
                hex = new Hex_1.Hex(i, j);
                var h = this.getHeight(hex);
                var variation = this.nurbsGenerator.simplex.noise2D(hex.r, hex.q) * this.options.noiseImpact;
                hex.height = h + variation + this.options.landSea;
                hex.altitude = h;
                mapData.push(hex);
            }
        }
        return mapData;
    }
}
exports.Generator = Generator;
;
//# sourceMappingURL=main.js.map