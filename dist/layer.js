"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Alea = require("alea");
const SimplexNoise = require("simplex-noise");
const nurb_1 = require("./nurb");
class Layer {
    /**
     *
     * @param size
     * @param resolution
     * @param seed
     * @param profile
     */
    constructor(patchSize, depth, seed, profile) {
        this._patchSize = patchSize;
        this._nurbs = [];
        this._simplex = new SimplexNoise(Alea(seed));
        this._profile = this.generateProfile(depth, profile);
        for (let u = 0; u < depth; u++) {
            this._nurbs[u] = [];
            for (let v = 0; v < depth; v++) {
                this._nurbs[u].push(new nurb_1.Nurb(this._patchSize, (i, j) => {
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
    getUV(u, v) {
        let patchU = Math.floor(u / this._patchSize);
        let patchV = Math.floor(v / this._patchSize);
        let nurbU = u % this._patchSize;
        let nurbV = v % this._patchSize;
        return this._nurbs[patchU][patchV].getUV(nurbU, nurbV);
    }
    generateProfile(depth, presetProfile) {
        let profile = [];
        for (let j = 0; j <= depth * 4; j++) {
            profile[j] = [];
            for (let i = 0; i <= depth * 4; i++) {
                profile[j][i] = this.generateCPoint(i, j, presetProfile);
            }
        }
        return profile;
    }
    generateCPoint(i, j, presetProfile) {
        let result = 0;
        let coef = 0;
        let profileV = Math.floor(j / 4);
        let profileU = Math.floor(i / 4);
        if (presetProfile) {
            if (presetProfile.length > profileV && presetProfile[0].length > profileU) {
                // patch courant
                result += presetProfile[profileV][profileU][j % 4][i % 4];
                coef++;
            }
            // Si on est en bordure droite de profile, on ajoute la dernière colonne de la même ligne du profile a gauche
            if (i && !(i % 4) && presetProfile.length > profileV) {
                result += presetProfile[profileV][profileU - 1][j - 4 * profileV][4];
                coef++;
            }
            // Si on est en bordure basse de profile, on ajoute la dernière ligne de la même colonne du profile au dessus
            if (j && !(j % 4) && presetProfile[0].length > profileU) {
                result += presetProfile[profileV - 1][profileU][4][i - 4 * profileU];
                coef++;
            }
            // Si on est dans le coin inferieur droit du profile, on ajoute la dernière ligne de la dernière colonne du profile au dessus a gauche
            if (j && !(j % 4) && i && !(i % 4)) {
                result += presetProfile[profileV - 1][profileU - 1][4][4];
                coef++;
            }
            result /= coef;
        }
        else {
            result += this._simplex.noise2D(i, j);
        }
        return result;
    }
}
exports.Layer = Layer;
//# sourceMappingURL=layer.js.map