"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const properties = new WeakMap();
function HandlerMethod(target, propertyKey, descriptor) {
    const props = properties.get(target);
    if (!props) {
        properties.set(target, [propertyKey]);
    }
    else {
        props.push(propertyKey);
    }
    return descriptor;
}
exports.HandlerMethod = HandlerMethod;
function getHandlerMethods(handler) {
    const ctor = handler.constructor;
    const prototype = ctor && ctor.prototype;
    const props = (prototype && properties.get(prototype)) || Object.keys(handler);
    return props;
}
exports.getHandlerMethods = getHandlerMethods;
//# sourceMappingURL=handler.js.map