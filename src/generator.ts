import { Hex } from './Hex';
import { Layer } from './layer';
import { Options } from './Options';

/**
 * 
 */
export class Generator {

	private _options: Options;
	private _mapWidth: number;
	private _mapHeight: number;
	private _layers: Layer[];

	constructor(options: Options) {
		this._options = new Options(options);
		this._mapWidth = this._options.patchSize * this._options.patchX;
		this._mapHeight = this._options.patchSize * this._options.patchY;
		this._layers = [];


		for (let d = 0; d < this._options.depth; d++) {
			let patchSize = this._options.patchSize * Math.pow(2, this._options.depth - d);
			this._layers.push(new Layer(patchSize, Math.pow(2, d), this._options.seed));
		}
		this._layers.push(new Layer(this._options.patchSize, Math.pow(2, this._options.depth), this._options.seed, this._options.profile));
	}

	private getUV(u: number, v: number) {
		return this._layers.reduce((accu, curr,index) => {
			return accu + curr.getUV(u, v)/ Math.pow(2, index);
		}, 0)
	}

	private getHeight(hex: Hex) {
		return Math.max(-1, Math.min(1, this.getUV(hex.j, hex.i)));
	}

	generate() {
		let mapData = [];
		let hex: Hex;
		for (let i = 0; i < this._mapWidth; i++) {
			for (let j = 0; j < this._mapHeight; j++) {
				hex = new Hex(i, j);
				hex.height = this.getHeight(hex) + this._options.landSea;
				mapData.push(hex);
			}
		}
		return mapData;
	}
};

