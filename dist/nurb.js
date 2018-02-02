"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geom_1 = require("@bluemath/geom");
class Nurb {
    /**
     * constructor
     * @param resolution number of point per dimension
     * @param func function that return the value of a control point
     */
    constructor(resolution, func) {
        this._knots = [0, 0, 0, 0, 0.5, 1, 1, 1, 1];
        this._degree = 3;
        this._controlPoints = [];
        for (let i = 0; i < 5; i++) {
            let a = [];
            for (let j = 0; j < 5; j++) {
                a.push([i, func(i, j), j]);
            }
            this._controlPoints.push(a);
        }
        this._nurbsSurface = new geom_1.nurbs.BSplineSurface(this._degree, this._degree, this._knots, this._knots, this._controlPoints).tessellatePoints(resolution);
    }
    ;
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
exports.Nurb = Nurb;
//# sourceMappingURL=nurb.js.map