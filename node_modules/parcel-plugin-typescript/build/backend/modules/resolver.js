"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const EXTENSIONS = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];
function findModule(path) {
    for (const extension of EXTENSIONS) {
        const resolved = `${path}${extension}`;
        try {
            const stat = fs_1.statSync(resolved);
            if (stat.isFile() && !stat.isDirectory()) {
                return resolved;
            }
        }
        catch (_a) {
            continue;
        }
    }
    return null;
}
exports.findModule = findModule;
//# sourceMappingURL=resolver.js.map