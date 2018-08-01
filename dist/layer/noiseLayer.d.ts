import { BaseLayer } from './baseLayer';
export declare class NoiseLayer implements BaseLayer {
    private _simplex;
    private _noiseImpact;
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
