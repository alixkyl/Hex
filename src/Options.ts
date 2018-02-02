import { profile } from './Profile';

export class Options {
    /**
     * seed for PRNG map generation
     */
    seed?: number;
    /**
     * number of Layer
     */
    depth?: number;
    /**
     * Number of Hex per dimension for a patch
     */
    patchSize?: number;
    /**
     * Number of patch along X for layer max
     */
    patchX?: number;
    /**
     * Number of patch along Y for layer max
     */
    patchY?: number;
    /**
     * Layer max preset
     */
    profile?: number[][][][];
    /**
     * offset for height
     */
    landSea?: number;
    /**
     * 
     */
    noiseImpact?: number;

    constructor(options: Options) {
        if (options.profile){
            this.profile = options.profile;
            this.depth = Math.ceil(Math.log2(options.profile.length));
            this.patchX = options.profile[0].length;
            this.patchY = options.profile.length;

        } else {
            this.profile = profile;
            this.depth = options.depth || 0;
            this.patchX = options.patchX || this.profile[0].length;
            this.patchY = options.patchY || this.profile.length;
        }
        this.patchSize = options.patchSize || 30;
        this.landSea = options.landSea || 0;
        this.seed = options.seed || 0;
        this.noiseImpact = options.noiseImpact || 0;
    }
};
