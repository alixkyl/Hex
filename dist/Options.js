export class Options {
    constructor(options) {
        this.profile = options.profile;
        this.width = options.width;
        this.height = options.height;
        this.depth = options.depth || 0;
        this.landSea = options.landSea || 0;
        this.seed = options.seed || 0;
        this.noiseImpact = options.noiseImpact || 0.5;
    }
}
;
//# sourceMappingURL=Options.js.map