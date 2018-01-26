export class Options {
    width: number; height: number; landSea: number; seed: number; patchSize: number; noiseImpact: number; degree: number; constructor(options: Options) {
        this.width = options.width || 100;
        this.height = options.height || 100;
        this.landSea = options.landSea || 0;
        this.seed = options.seed || 0;
        this.patchSize = options.patchSize || 30;
        this.noiseImpact = options.noiseImpact || 0;
        this.degree = options.degree || 3;
    }
};
