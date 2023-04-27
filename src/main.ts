import "reflect-metadata"
import { SystemLogger } from "@imeepos/logger";
import { reqidMiddleware, errorMiddleware } from '@imeepos/request';
import imeeposAddon from '@imeepos/addon'
import imeeposPm2 from '@imeepos/pm2'
import { join } from "path";
import { config } from 'dotenv';
import { connect } from 'mongoose'
import express from 'express'
import cors from 'cors';

export async function bootstrap(root: string) {
    config();
    connect(process.env.MONGO_URL || '')
    const app = express()
    app.use(express.json({}))
    app.use(express.urlencoded({}))
    app.use(express.static('attachments'))
    app.use(cors())
    app.use((req, res, next) => {
        Reflect.set(req, 'root', root)
        next()
    });
    app.use(reqidMiddleware)
    app.use('/addon', imeeposAddon())
    app.use('/pm2', imeeposPm2())
    app.use(errorMiddleware);
    const logger = new SystemLogger()
    app.listen(8080, '0.0.0.0', () => {
        logger.info(`app start at http://0.0.0.0:8080`)
    })
}

bootstrap(join(__dirname, '..'))