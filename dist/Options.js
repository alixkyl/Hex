"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = require("./Profile");
class Options {
    constructor(options) {
        if (options.profile) {
            this.profile = options.profile;
            this.depth = Math.ceil(Math.log2(options.profile.length));
            this.patchX = options.profile[0].length;
            this.patchY = options.profile.length;
        }
        else {
            this.profile = Profile_1.profile;
            this.depth = options.depth || 0;
            this.patchX = options.patchX || this.profile[0].length;
            this.patchY = options.patchY || this.profile.length;
        }
        this.patchSize = options.patchSize || 30;
        this.landSea = options.landSea || 0;
        this.seed = options.seed || 0;
        this.noiseImpact = options.noiseImpact || 0;
    }
}
exports.Options = Options;
;
//# sourceMappingURL=Options.js.map