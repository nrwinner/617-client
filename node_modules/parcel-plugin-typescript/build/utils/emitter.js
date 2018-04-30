"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Emitter {
    constructor() {
        this.listeners = [];
    }
    on(listener) {
        const id = Emitter.idCounter++;
        this.listeners.push({ id, listener });
        return () => {
            const { listeners } = this;
            const { length } = listeners;
            for (let i = 0; i < length; i++) {
                const { id: current } = listeners[i];
                if (current === id) {
                    listeners.splice(i, 0);
                    return;
                }
            }
            throw new Error('Listener already removed');
        };
    }
    once(condition) {
        return new Promise(resolve => {
            const off = this.on(data => {
                if (!condition || condition(data)) {
                    off();
                    resolve(data);
                }
            });
        });
    }
    emit(data) {
        const { listeners } = this;
        const { length } = listeners;
        for (let i = 0; i < length; i++) {
            const { listener } = listeners[i];
            listener(data);
        }
    }
    off() {
        this.listeners.splice(0);
    }
}
Emitter.idCounter = 0;
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map