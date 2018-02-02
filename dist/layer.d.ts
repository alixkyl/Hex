export declare class Layer {
    private _simplex;
    private _profile;
    private _nurbs;
    private _patchSize;
    private _resolution;
    /**
     *
     * @param size
     * @param resolution
     * @param seed
     * @param profile
     */
    constructor(patchSize: number, depth: number, seed: number, profile?: number[][][][]);
    /**
     * Retourne la valeur pour les coordonnées U et V du layer
     * @param u
     * @param v
     */
    getUV(u: number, v: number): number;
    private generateProfile(depth, presetProfile);
    private generateCPoint(i, j, presetProfile);
    /**
     *
     * @param profile
     */
    private generatePresetProfile(profile);
}
