
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
        let iMod = i % 4;
        if (i!==0 && iMod === 0) {
            u--;
        }
        let jMod = j % 4;
        if (j !==0 && jMod ===0) {
            v--;
        }
        if (presetProfile && presetProfile.length > u && presetProfile[u].length > v) {
            result += presetProfile[u][v][iMod][jMod];
            if (iMod === 0 && presetProfile.length > u + 1) {
                result += presetProfile[u + 1][v][0][j % 4];
                coef++;
            }
            if (jMod === 0 && presetProfile[u].length > v + 1) {
                result += presetProfile[u][v + 1][iMod][0];
                coef++;
            }
            if (iMod === 0 && jMod === 0 && presetProfile.length > u + 1 && presetProfile[u + 1].length > v + 1) {
                result += presetProfile[u + 1][v + 1][0][0];
                coef++;
            }
            result /= coef;
        } else {
            result += this._simplex.noise2D(i, j);
        }
        return result;
    }
}
