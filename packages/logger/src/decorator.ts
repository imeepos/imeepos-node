import { MethodLogger } from "./logger"
export function Log(): MethodDecorator {
    return (target, key, descriptor) => {
        const name = target.constructor.name;
        const property = key as string;
        const method = Reflect.get(target, key)
        const res: any = (...args: any[]) => {
            const logger = new MethodLogger(name, property, args)
            const res = method.bind(target)(...args);
            if (isPromise<any>(res)) {
                res.then(item => logger.info(item)).catch(e => logger.error(e))
            } else {
                logger.info(res)
            }
            return res;
        };
        Reflect.set(target, key, res)
        return res;
    }
}
export function isPromise<T>(res: any): res is Promise<T> {
    if (typeof res === 'object') {
        return Reflect.has(res, 'then') && Reflect.has(res, 'catch')
    }
    return false;
}