import * as SimplexNoise from 'simplex-noise';
export declare class NurbsGenerator {
    simplex: SimplexNoise;
    private presetProfile;
    private nurbs;
    constructor(seed: number, profile: number[][][][]);
    nurbsGenerator(x: number, y: number, p: number, size: number, func: (x: number, y: number) => number): (u: number, v: number) => number;
    /**
    *getNurbsFunction
    */
    getNurbsFunction(layer: number, width: number, height: number, size: number): (x: number, y: number) => number;
    /**
    *generatePresetProfile
    */
    generatePresetProfile(profile: number[][][][]): number[][];
}
