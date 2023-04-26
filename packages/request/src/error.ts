import { useLogger } from '@imeepos/logger';
import { Request, Response, NextFunction } from 'express'
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    const status = Reflect.get(err, 'status') || 500;
    res.statusCode = status;
    res.statusMessage = err.message;
    const logger = useLogger(req, '@imeepos/request/error')
    logger.error(err.message)
    res.json({ success: false, message: err.message, stack: err.stack })
}
