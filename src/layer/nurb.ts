import { nurbs } from '@bluemath/geom';
import { NDArray } from '@bluemath/common/lib/ndarray';
import * as workerPath from "file-loader?name=[name].js!./worker";
import { BSplineSurface } from '@bluemath/geom/lib/nurbs';

export class Nurb {

    private _controlPoints: number[][][] = [];
    private _knots = [0, 0, 0, 0, 0.5, 1, 1, 1, 1];
    private _degree = 3;
    private _nurbsSurface: NDArray;
    private _bSplineSurface:BSplineSurface;

    /**
     * constructor
     * @param resolution number of point per dimension
     * @param func function that return the value of a control point
     */
    constructor(func: (i: number, j: number) => number) {
        for (let i = 0; i < 5; i++) {
            this._controlPoints[i] = [];
            for (let j = 0; j < 5; j++) {
                this._controlPoints[i][j] = [i, func(i, j), j];
            }
        }

        let bSplineSurface = new BSplineSurface(this._degree, this._degree, this._knots, this._knots, this._controlPoints);
        
    };

    tesselate(resolution: number){
        return new Promise(function(resolve){
            let worker = new Worker('./worker');
            worker.addEventListener('message', result =>{
                this._nurbsSurface = result.data;
                resolve();
            } );
            worker.postMessage({ bSplineSurface: this._bSplineSurface, resolution: resolution });
        });
    }

    /**
     * 
     * @param u 
     * @param v 
     */
    getUV(u: number, v: number) {
        return this._nurbsSurface.getN(u, v, 1);
    };
}
