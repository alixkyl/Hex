import { BSplineSurface } from '@bluemath/geom/lib/nurbs';
export class Nurb {
    /**
     * constructor
     * @param resolution number of point per dimension
     * @param func function that return the value of a control point
     */
    constructor(func) {
        this._controlPoints = [];
        this._knots = [0, 0, 0, 0, 0.5, 1, 1, 1, 1];
        this._degree = 3;
        for (let i = 0; i < 5; i++) {
            this._controlPoints[i] = [];
            for (let j = 0; j < 5; j++) {
                this._controlPoints[i][j] = [i, func(i, j), j];
            }
        }
        let bSplineSurface = new BSplineSurface(this._degree, this._degree, this._knots, this._knots, this._controlPoints);
    }
    ;
    tesselate(resolution) {
        return new Promise(function (resolve) {
            let worker = new Worker('./worker');
            worker.addEventListener('message', result => {
                this._nurbsSurface = result.data;
                resolve();
            });
            worker.postMessage({ bSplineSurface: this._bSplineSurface, resolution: resolution });
        });
    }
    /**
     *
     * @param u
     * @param v
     */
    getUV(u, v) {
        return this._nurbsSurface.getN(u, v, 1);
    }
    ;
}
//# sourceMappingURL=nurb.js.map