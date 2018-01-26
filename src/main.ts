import { Hex } from './Hex';
import { NurbsGenerator } from './NurbGenerator';
import { profile } from './Profile';
import { Options } from './Options';

/**
*HexMapGenerator
*/
export class Generator {

	private options: Options;
	private PatchWidth: number;
	private PatchHeight: number;
	private nurbsGenerator: NurbsGenerator;

	constructor(options: Options) {
		this.options = new Options(options);
		this.nurbsGenerator = new NurbsGenerator(this.options.seed, profile);
		this.PatchWidth = Math.floor(this.options.width / profile[0].length);
		this.PatchHeight = Math.floor(this.options.height / profile.length);
	}

	private getHeight(hex: Hex) {
		var w = Math.floor(hex.j / this.PatchWidth);
		var h = Math.floor(hex.i / this.PatchHeight);
		var result = this.nurbsGenerator.getNurbsFunction(0, w, h)((hex.j - w * this.PatchWidth) / this.PatchWidth, (hex.i - h * this.PatchHeight) / this.PatchHeight);
		for (var d = 1; d < this.options.degree; d++) {

			var impact = 1 / Math.pow(2, d);

			var size = this.options.patchSize * Math.pow(2, this.options.degree - d);

			w = Math.floor(hex.j / size);
			h = Math.floor(hex.i / size);

			result += this.nurbsGenerator.getNurbsFunction(d, w, h)((hex.j - w * size) / size, (hex.i - h * size) / size);
		}
		return Math.max(-1, Math.min(1, result));
	}

	generate() {
		var mapData = [];
		var hex: Hex;
		for (var i = 0; i < this.options.height; i++) {
			for (var j = 0; j < this.options.width; j++) {
				hex = new Hex(i, j);
				var h = this.getHeight(hex);
				// var variation = this.simplex.noise2D(hex.r,hex.q)*this.options.noiseImpact;
				hex.height = h/*+variation*/ + this.options.landSea;
				hex.altitude = h;
				mapData.push(hex);
			}
		}
		return mapData;
	}
};

