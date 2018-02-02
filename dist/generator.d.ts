import { Hex } from './Hex';
import { Options } from './Options';
/**
 *
 */
export declare class Generator {
    private _options;
    private _mapWidth;
    private _mapHeight;
    private _layers;
    constructor(options: Options);
    private getUV(u, v);
    private getHeight(hex);
    generate(): Hex[];
}
