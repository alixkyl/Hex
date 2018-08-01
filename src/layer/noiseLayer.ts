
import * as Alea from 'alea';
import * as SimplexNoise from 'simplex-noise';
import { BaseLayer } from './baseLayer';

export class NoiseLayer implements BaseLayer {

    private _simplex: SimplexNoise;
    private _noiseImpact: number;

    /**
     * 
     * @param size 
     * @param resolution 
     * @param seed 
     * @param profile 
     */
    constructor(seed: number, noiseImpact: number) {
        this._noiseImpact = noiseImpact;
        this._simplex = new SimplexNoise(Alea(seed));
    }

    /**
     * Retourne la valeur pour les coordonnées U et V du layer
     * @param u 
     * @param v 
     */
    getUV(u: number, v: number) {
        return this._simplex.noise2D(u * this._noiseImpact, v * this._noiseImpact);
    }
}
