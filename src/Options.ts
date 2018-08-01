export class Options {
  /**
   * seed for PRNG map generation
   */
  public seed?: number;
  /**
   * number of Layer
   */
  public depth?: number;

  public width: number;
  public height: number;

  /**
   * Layer max preset
   */
  public profile?: number[][][][];
  /**
   * offset for height
   */
  public landSea?: number;
  /**
   * distortion du bruit de génération
   */
  public noiseImpact?: number;

  constructor(options: Options) {
    this.profile = options.profile;
    this.width = options.width;
    this.height = options.height;
    this.depth = options.depth || 0;
    this.landSea = options.landSea || 0;
    this.seed = options.seed || 0;
    this.noiseImpact = options.noiseImpact || 0.5;
  }
}
