var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Nurb } from './nurb';
export class ProfiledLayer {
    /**
     *
     * @param size
     * @param resolution
     * @param seed
     * @param profile
     */
    constructor(width, height, profile) {
        this._nurbs = [];
        this._patchU = profile[0].length;
        this._patchV = profile.length;
        this._patchSize = Math.floor(Math.min(height / profile.length, width / profile[0].length));
        this._profile = this.generateProfile(profile.length, profile[0].length, profile);
        for (let v = 0; v < profile.length; v++) {
            this._nurbs[v] = [];
            for (let u = 0; u < profile[0].length; u++) {
                this._nurbs[v].push(new Nurb((i, j) => {
                    let x = 4 * u + i;
                    let y = 4 * v + j;
                    return this._profile[x][y];
                }));
            }
        }
    }
    tesselate() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                let promises = [];
                for (let v = 0; v < this._patchV; v++) {
                    for (let u = 0; u < this._patchU; u++) {
                        promises.push(this._nurbs[v][u].tesselate(this._patchSize));
                    }
                }
                Promise.all(promises)
                    .then(function () {
                    resolve();
                });
            });
        });
    }
    /**
     * Retourne la valeur pour les coordonnées U et V du layer
     * @param u
     * @param v
     */
    getUV(u, v) {
        let patchU = Math.floor(u / this._patchSize);
        let patchV = Math.min(Math.floor(v / this._patchSize), this._patchV);
        let nurbU = u % this._patchSize;
        let nurbV = v % this._patchSize;
        if (patchU < this._patchU && patchV < this._patchV) {
            return this._nurbs[patchU][patchV].getUV(nurbU, nurbV);
        }
        else {
            return 0;
        }
    }
    generateProfile(width, height, presetProfile) {
        let profile = [];
        for (let j = 0; j <= height * 4; j++) {
            profile[j] = [];
            for (let i = 0; i <= width * 4; i++) {
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
        return result / coef;
    }
}
//# sourceMappingURL=profiledLayer.js.map