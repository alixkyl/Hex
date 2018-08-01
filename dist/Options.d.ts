export declare class Options {
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
    constructor(options: Options);
}
