export declare class Options {
    /**
     * seed for PRNG map generation
     */
    seed: number;
    /**
     * number of Layer
     */
    depth: number;
    /**
     * Number of Hex per dimension for a patch
     */
    patchSize: number;
    /**
     * Number of patch along X for layer max
     */
    patchX: number;
    /**
     * Number of patch along Y for layer max
     */
    patchY: number;
    /**
     * Layer max preset
     */
    profile: number[][][][];
    /**
     * offset for height
     */
    landSea: number;
    /**
     *
     */
    noiseImpact: number;
    constructor(options: Options);
}
