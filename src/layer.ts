
import * as Alea from 'alea';
import * as SimplexNoise from 'simplex-noise';
import { Nurb } from './nurb';

export class Layer {

    private _simplex: SimplexNoise;
    private _profile: number[][];
    private _nurbs: Nurb[][];
    private _patchSize: number;
    private _resolution: number;

    /**
     * 
     * @param size 
     * @param resolution 
     * @param seed 
     * @param profile 
     */
    constructor(patchSize: number, depth: number, seed: number, profile?: number[][][][]) {
        this._patchSize = patchSize;
        this._nurbs = [];

        this._simplex = new SimplexNoise(Alea(seed));

        this._profile = this.generateProfile(depth, profile);

        for (let u = 0; u < depth; u++) {
            this._nurbs[u] = [];
            for (let v = 0; v < depth; v++) {
                this._nurbs[u].push(new Nurb(this._patchSize, (i, j) => {
                    let x = 4 * u + i;
                    let y = 4 * v + j;
                    return this._profile[x][y];
                }));
            }
        }
    }

    /**
     * Retourne la valeur pour les coordonnées U et V du layer
     * @param u 
     * @param v 
     */
    getUV(u: number, v: number) {
        let patchU = Math.floor(u / this._patchSize);
        let patchV = Math.floor(v / this._patchSize);
        let nurbU = u % this._patchSize;
        let nurbV = v % this._patchSize;
        return this._nurbs[patchU][patchV].getUV(nurbU, nurbV);
    }

    private generateProfile(depth: number, presetProfile: number[][][][]) {
        let profile: number[][] = [];
        for (let i = 0; i < depth * 4 + 1; i++) {
            profile[i] = [];
            for (let j = 0; j < depth * 4 + 1; j++) {
                profile[i][j] = this.generateCPoint(i, j, presetProfile);
            }
        }
        return profile;
    }

    private generateCPoint(i: number, j: number, presetProfile: number[][][][]): number {
        let result = 0;
        let coef = 1;
        let u = Math.floor(i / 4);
        let v = Math.floor(j / 4);

        if (presetProfile && presetProfile.length > u && presetProfile[u].length > v) {
            result += presetProfile[u][v][i % 4][j % 4];
            if (i === 4 && presetProfile.length > u + 1) {
                result += presetProfile[u + 1][v][0][j % 4];
                coef++;
            }
            if (j === 4 && presetProfile[u].length > v + 1) {
                result += presetProfile[u][v + 1][i % 4][0];
                coef++;
            }
            if (i === 4 && j === 4 && presetProfile.length > u + 1 && presetProfile[u + 1].length > v + 1) {
                result += presetProfile[u + 1][v + 1][0][0];
                coef++;
            }
            result /= coef;
        } else {
            result += this._simplex.noise2D(i, j);
        }
        return result;
    }

	/**
     * 
     * @param profile 
     */
    private generatePresetProfile(profile: number[][][][]) {
        let coef: number[][] = [];
        let presetProfile: number[][] = [];

        for (let i = 0; i < profile.length; i++) {
            for (let j = 0; j < profile[i].length; j++) {

                let p = profile[j][i];

                for (let x = 0; x < 5; x++) {
                    coef[i * 4 + x] = [];
                    presetProfile[i * 4 + x] = [];
                    for (let y = 0; y < 5; y++) {
                        if (!presetProfile[i * 4 + x][j * 4 + y]) {
                            coef[i * 4 + x][j * 4 + y] = 1;
                            presetProfile[i * 4 + x][j * 4 + y] = p[y][x];
                        } else {
                            coef[i * 4 + x][j * 4 + y]++;
                            presetProfile[i * 4 + x][j * 4 + y] += p[y][x];
                        }
                    }
                }
            }
        }
        for (let i = 0; i < coef.length; i++) {
            for (let j = 0; j < coef[i].length; j++) {
                presetProfile[i][j] = presetProfile[i][j] / coef[i][j];
            }
        }
        return presetProfile;
    }
}
