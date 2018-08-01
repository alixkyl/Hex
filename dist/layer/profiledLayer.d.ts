import { IBaseLayer } from "./baselayer";
export declare class ProfiledLayer implements IBaseLayer {
    private profile;
    private nurbs;
    private patchSize;
    private patchU;
    private patchV;
    /**
     *
     * @param size
     * @param resolution
     * @param seed
     * @param profile
     */
    constructor(width: number, height: number, profile: number[][][][]);
    tesselate(): Promise<void>;
    /**
     * Retourne la valeur pour les coordonnées U et V du layer
     * @param u
     * @param v
     */
    getUV(u: number, v: number): number;
    private generateProfile;
    private generateCPoint;
}
