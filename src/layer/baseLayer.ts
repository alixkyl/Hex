export interface IBaseLayer {
  /**
   * Retourne la valeur pour les coordonnées U et V du layer
   */
  getUV(u: number, v: number): number;
}
