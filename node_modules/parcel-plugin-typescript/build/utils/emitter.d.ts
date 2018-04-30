export declare type Listener<T> = (data: T) => void;
export declare class Emitter<T> {
    private static idCounter;
    private readonly listeners;
    on(listener: Listener<T>): () => void;
    once(condition?: (data: T) => boolean): Promise<T>;
    emit(data: T): void;
    off(): void;
}
