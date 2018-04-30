export declare type Keys<T, U> = (keyof T) & (keyof U);
export declare type Handler<RQ, RS> = {
    [P in Keys<RQ, RS>]: (data: RQ[P]) => Promise<RS[P]>;
};
export declare function HandlerMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
export declare function getHandlerMethods<T extends {}>(handler: T): Array<keyof T>;
