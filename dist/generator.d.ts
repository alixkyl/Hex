import { Hex } from "./Hex";
import { Options } from "./Options";
export declare class Generator {
    private options;
    private layers;
    constructor(options: Options);
    generate(): Promise<Hex[]>;
    private getUV;
}
