export declare class Nurb {
    private _controlPoints;
    private _knots;
    private _degree;
    private _nurbsSurface;
    /**
     * constructor
     * @param resolution number of point per dimension
     * @param func function that return the value of a control point
     */
    constructor(resolution: number, func: (i: number, j: number) => number);
    /**
     *
     * @param u
     * @param v
     */
    getUV(u: number, v: number): number;
}
