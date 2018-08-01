import { BaseLayer } from './baseLayer';
export declare class ProfiledLayer implements BaseLayer {
    private _profile;
    private _nurbs;
    private _patchSize;
    private _patchU;
    private _patchV;
    /**
     *
     * @param size
     * @param resolution
     * @param seed
     * @param profile
     */
    constructor(width: number, height: number, profile: number[][][][]);
    tesselate(): Promise<{}>;
    /**
     * Retourne la valeur pour les coordonnées U et V du layer
     * @param u
     * @param v
     */
    getUV(u: number, v: number): number;
    private generateProfile(width, height, presetProfile);
    private generateCPoint(i, j, presetProfile);
}
