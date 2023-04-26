import { Logger, useLogger } from "@imeepos/logger";
import { join } from "path";
import { config } from 'dotenv';
import { connect } from 'mongoose'
import { RequestService } from '@imeepos/request'
import express from 'express'
import { Router, NextFunction, Request, Response } from 'express'

export function bootstrap(root: string) {
    config()
    connect(process.env.MONGO_URL || '')
    const app = express()
    const router = Router()
    router.use(async (req, res, next) => {
        try {
            /**
             * 更新请求状态
             */
            res.on('finish', () => {
                const { statusCode, statusMessage } = res;
                new RequestService().update(req, statusCode, statusMessage).catch(e => {
                    const reqid = Reflect.get(req, 'reqid')
                    const logger = new Logger(root, 'mongo.request', reqid)
                    logger.error(e.message)
                });
            });
            const reqid = await new RequestService().save(req)
            Reflect.set(req, 'logger', (label: string) => new Logger(root, label, reqid))
            next()
        } catch (e) {
            next(e)
        }
    })
    /**
     * 业务逻辑
     */
    router.use(async (req, res, next) => {
        try {
            await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    const r = Math.random()
                    if (r > 0.5) {
                        reject(new Error(`test error`))
                    } else {
                        resolve()
                    }
                }, 1000)
            })
            const logger = useLogger(req, 'work')
            logger.error(`an error happend`)
            res.json({ success: true })
        } catch (e) {
            next(e)
        }
    });
    /**
     * 错误处理
     */
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        const status = Reflect.get(err, 'status') || 500;
        res.statusCode = status;
        res.statusMessage = err.message;
        res.json({ success: false, message: err.message, stack: err.stack })
        next();
    });
    app.use(router)
    const logger = new Logger(root, 'main', 'none')
    app.listen(8080, '0.0.0.0', () => {
        logger.info(`app start at http://0.0.0.0:8080`)
    })
}

bootstrap(join(__dirname, '..'))