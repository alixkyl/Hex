import { Hex } from './Hex';
import { Options } from './Options';
import { ProfiledLayer, NoiseLayer } from './layer/';
export class Generator {
    constructor(options) {
        this._layers = [];
        this._options = new Options(options);
    }
    getUV(u, v) {
        return this._layers.reduce((accu, curr, index) => {
            return accu + curr.getUV(u, v) / Math.pow(2, index + 1);
        }, 0);
    }
    generate() {
        console.log('in', this);
        if (this._options.profile) {
            let layer = new ProfiledLayer(this._options.width, this._options.height, this._options.profile);
            this._layers.push(layer);
            layer.tesselate();
        }
        else {
            this._layers.push(new NoiseLayer(this._options.seed, this._options.noiseImpact * 0.5));
        }
        for (let d = 1; d <= this._options.depth; d++) {
            this._layers.push(new NoiseLayer(this._options.seed + d, this._options.noiseImpact * d));
        }
        let mapData = [];
        for (let i = 0; i < this._options.width; i++) {
            for (let j = 0; j < this._options.height; j++) {
                const hex = new Hex(i, j);
                hex.height = this.getUV(i, j) + this._options.landSea;
                mapData.push(hex);
            }
        }
        return mapData;
    }
}
;
//# sourceMappingURL=generator.js.map