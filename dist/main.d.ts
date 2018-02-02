import { Hex } from './Hex';
import { Options } from './Options';
/**
*HexMapGenerator
*/
export declare class Generator {
    private options;
    private PatchWidth;
    private PatchHeight;
    private nurbsGenerator;
    constructor(options: Options);
    private getHeight(hex);
    generate(): Hex[];
}
