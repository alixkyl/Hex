import { Nurb } from "./nurb";
export class ProfiledLayer {
    /**
     *
     * @param size
     * @param resolution
     * @param seed
     * @param profile
     */
    constructor(width, height, profile) {
        this.nurbs = [];
        this.patchU = profile[0].length;
        this.patchV = profile.length;
        this.patchSize = Math.floor(Math.min(height / profile.length, width / profile[0].length));
        this.profile = this.generateProfile(profile.length, profile[0].length, profile);
        for (let v = 0; v < profile.length; v++) {
            this.nurbs[v] = [];
            for (let u = 0; u < profile[0].length; u++) {
                this.nurbs[v].push(new Nurb((i, j) => {
                    const x = 4 * u + i;
                    const y = 4 * v + j;
                    return this.profile[x][y];
                }));
            }
        }
    }
    async tesselate() {
        const promises = [];
        for (let v = 0; v < this.patchV; v++) {
            for (let u = 0; u < this.patchU; u++) {
                promises.push(this.nurbs[v][u].tesselate(this.patchSize));
            }
        }
        await Promise.all(promises);
    }
    /**
     * Retourne la valeur pour les coordonnées U et V du layer
     * @param u
     * @param v
     */
    getUV(u, v) {
        const patchU = Math.floor(u / this.patchSize);
        const patchV = Math.min(Math.floor(v / this.patchSize), this.patchV);
        const nurbU = u % this.patchSize;
        const nurbV = v % this.patchSize;
        if (patchU < this.patchU && patchV < this.patchV) {
            return this.nurbs[patchU][patchV].getUV(nurbU, nurbV);
        }
        else {
            return 0;
        }
    }
    generateProfile(width, height, presetProfile) {
        const profile = [];
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
        const profileV = Math.floor(j / 4);
        const profileU = Math.floor(i / 4);
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
        // Si on est dans le coin inferieur droit du profile,
        // on ajoute la dernière ligne de la dernière colonne du profile au dessus a gauche
        if (j && !(j % 4) && i && !(i % 4)) {
            result += presetProfile[profileV - 1][profileU - 1][4][4];
            coef++;
        }
        return result / coef;
    }
}
//# sourceMappingURL=profiledLayer.js.map