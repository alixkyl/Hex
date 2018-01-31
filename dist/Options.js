"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Options {
    constructor(options) {
        this.width = options.width || 100;
        this.height = options.height || 100;
        this.landSea = options.landSea || 0;
        this.seed = options.seed || 0;
        this.patchSize = options.patchSize || 30;
        this.noiseImpact = options.noiseImpact || 0;
        this.degree = options.degree || 3;
    }
}
exports.Options = Options;
;
//# sourceMappingURL=Options.js.map