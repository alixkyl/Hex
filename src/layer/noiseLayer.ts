import * as Alea from "alea";
import * as SimplexNoise from "simplex-noise";
import { IBaseLayer } from "./baselayer";

export class NoiseLayer implements IBaseLayer {
  private simplex: SimplexNoise;
  private noiseImpact: number;

  /**
   *
   * @param size
   * @param resolution
   * @param seed
   * @param profile
   */
  constructor(seed: number, noiseImpact: number) {
    this.noiseImpact = noiseImpact;
    this.simplex = new SimplexNoise(Alea(seed));
  }

  /**
   * Retourne la valeur pour les coordonnées U et V du layer
   * @param u
   * @param v
   */
  public getUV(u: number, v: number) {
    return this.simplex.noise2D(u * this.noiseImpact, v * this.noiseImpact);
  }
}
