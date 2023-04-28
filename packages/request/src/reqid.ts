import { Request, Response, NextFunction } from 'express'
import { RequestService } from './request.service';
import { RequestLogger } from '@imeepos/logger'
import { useRoot } from './useRoot';
export async function reqidMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        /**
         * 更新请求状态
         */
        res.on('finish', () => {
            const { statusCode, statusMessage } = res;
            new RequestService().update(req, statusCode, statusMessage)
        });
        const reqid = await new RequestService().save(req)
        const root = useRoot(req)
        Reflect.set(req, 'logger', (label: string) => new RequestLogger(label, reqid))
        next()
    } catch (e) {
        next(e)
    }
}