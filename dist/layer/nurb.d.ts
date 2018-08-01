export declare class Nurb {
    private controlPoints;
    private knots;
    private degree;
    private nurbsSurface;
    private bSplineSurface;
    /**
     * constructor
     * @param resolution number of point per dimension
     * @param func function that return the value of a control point
     */
    constructor(func: (i: number, j: number) => number);
    tesselate(resolution: number): Promise<{}>;
    /**
     *
     * @param u
     * @param v
     */
    getUV(u: number, v: number): number;
}
