"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Batcher {
    constructor(work, delay = 0) {
        this.work = work;
        this.delay = delay;
        this.timeout = null;
        this.queue = [];
        this.batch = () => {
            this.timeout = null;
            if (this.queue.length > 0) {
                this.work(this.drain());
            }
        };
    }
    emit(data) {
        this.queue.push(data);
        if (this.timeout === null) {
            this.timeout = setTimeout(this.batch, this.delay);
        }
    }
    clear() {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
        this.drain();
    }
    drain() {
        return this.queue.splice(0);
    }
}
exports.Batcher = Batcher;
//# sourceMappingURL=batcher.js.map