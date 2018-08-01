import { NDArray } from "@bluemath/common/lib/ndarray";
import { BSplineSurface } from "@bluemath/geom/lib/nurbs";

export class Nurb {
  private controlPoints: number[][][] = [];
  private knots = [0, 0, 0, 0, 0.5, 1, 1, 1, 1];
  private degree = 3;
  private nurbsSurface: NDArray;
  private bSplineSurface: BSplineSurface;

  /**
   * constructor
   * @param resolution number of point per dimension
   * @param func function that return the value of a control point
   */
  constructor(func: (i: number, j: number) => number) {
    for (let i = 0; i < 5; i++) {
      this.controlPoints[i] = [];
      for (let j = 0; j < 5; j++) {
        this.controlPoints[i][j] = [i, func(i, j), j];
      }
    }

    this.bSplineSurface = new BSplineSurface(
      this.degree,
      this.degree,
      this.knots,
      this.knots,
      this.controlPoints,
    );
  }

  public tesselate(resolution: number) {
    return new Promise((resolve) => {
      const worker = new Worker("./worker");
      worker.addEventListener("message", (result) => {
        this.nurbsSurface = result.data;
        resolve();
      });
      worker.postMessage({
        bSplineSurface: this.bSplineSurface,
        resolution,
      });
    });
  }

  /**
   *
   * @param u
   * @param v
   */
  public getUV(u: number, v: number) {
    return this.nurbsSurface.getN(u, v, 1);
  }
}
