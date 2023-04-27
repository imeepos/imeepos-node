import { Response } from 'express';
export interface VoidFunction {
    (val: unknown): void;
}
export function usePromise() {
    let _resolve: VoidFunction | undefined = undefined;
    let _reject: VoidFunction | undefined = undefined
    const _promise = new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
    })
    const handler = (error: Error | undefined | null, data: unknown) => {
        if (error) _reject && _reject(error)
        else _resolve && _resolve(data)
    }
    return [_promise, handler]
}
export function success<T>(res: Response, data: T) {
    res.json({ success: true, message: 'ok', data })
}
export function useSuccess(res: Response) {
    return <T>(data: T) => {
        success(res, data)
    }
}
export function fail(res: Response, error: Error | string | any) {
    if (error instanceof Error) {
        res.json({ success: false, message: error.message, data: { message: error.message, stack: error.stack } })
    } else if (typeof error === 'string') {
        res.json({ success: false, message: error })
    } else {
        res.json({ success: false, message: error.message, data: error })
    }
}
export function useFail(res: Response) {
    return (error: Error | string | any) => {
        fail(res, error)
    }
}

export function isPromise<T>(res: any): res is Promise<T> {
    return Reflect.has(res, 'then') && Reflect.has(res, 'catch')
}