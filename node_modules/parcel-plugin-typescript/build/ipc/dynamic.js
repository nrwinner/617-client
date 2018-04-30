"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const tmp_1 = require("tmp");
const uuid = require("uuid/v1");
function setSocketPath(name) {
    const prop = envVarName(name);
    const { [prop]: socket } = process.env;
    if (socket) {
        return socket;
    }
    let path = null;
    if (process.platform === 'win32') {
        path = path_1.join('\\\\?\\pipe', process.cwd(), uuid());
    }
    else {
        path = tmp_1.tmpNameSync();
    }
    return process.env[prop] = path;
}
exports.setSocketPath = setSocketPath;
function getSocketPath(name) {
    const prop = envVarName(name);
    const { [prop]: socket } = process.env;
    if (!socket) {
        throw new Error(`[parcel-plugin-${name}]: cannot find socket`);
    }
    return socket;
}
exports.getSocketPath = getSocketPath;
const envVarName = (name) => `_PARCEL_PLUGIN_${name.toUpperCase()}_IPC_SOCKET_`;
//# sourceMappingURL=dynamic.js.map