import { nurbs } from '@bluemath/geom';
import { NDArray } from '@bluemath/common/lib/ndarray';

export class Nurb {

    private _controlPoints: number[][][];
    private _knots = [0, 0, 0, 0, 0.5, 1, 1, 1, 1];
    private _degree = 3;
    private _nurbsSurface: NDArray;

    /**
     * constructor
     * @param resolution number of point per dimension
     * @param func function that return the value of a control point
     */
    constructor(resolution: number, func: (i: number, j: number) => number) {
        this._controlPoints = []
        for (let i = 0; i < 5; i++) {
            let a: number[][] = [];
            for (let j = 0; j < 5; j++) {
                a.push([i, func(i,j), j]);
            }
            this._controlPoints.push(a);
        }
        this._nurbsSurface = new nurbs.BSplineSurface(this._degree, this._degree, this._knots, this._knots, this._controlPoints).tessellatePoints(resolution);
    };

    /**
     * 
     * @param u 
     * @param v 
     */
    getUV(u: number, v: number) {
        return this._nurbsSurface.getN(u, v, 1);
    };
}
