import { profileIsland, profileDefault } from './Profile';

export class Options {
    /**
     * seed for PRNG map generation
     */
    seed?: number;
    /**
     * number of Layer
     */
    depth?: number;

    width: number;
    height: number;

    /**
     * Layer max preset
     */
    profile?: number[][][][];
    /**
     * offset for height
     */
    landSea?: number;
    /**
     * distortion du bruit de génération
     */
    noiseImpact?: number;

    constructor(options: Options) {
        this.profile = options.profile;
        this.width = options.width;
        this.height = options.height;
        this.depth = options.depth || 0;
        this.landSea = options.landSea || 0;
        this.seed = options.seed || 0;
        this.noiseImpact = options.noiseImpact || 0.5;
    }
};
