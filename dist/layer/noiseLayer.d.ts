import { IBaseLayer } from "./baselayer";
export declare class NoiseLayer implements IBaseLayer {
    private simplex;
    private noiseImpact;
    /**
     *
     * @param size
     * @param resolution
     * @param seed
     * @param profile
     */
    constructor(seed: number, noiseImpact: number);
    /**
     * Retourne la valeur pour les coordonnées U et V du layer
     * @param u
     * @param v
     */
    getUV(u: number, v: number): any;
}
