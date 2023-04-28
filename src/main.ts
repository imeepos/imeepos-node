import "reflect-metadata"
import { SystemLogger } from "@imeepos/logger";
import { reqidMiddleware, errorMiddleware } from '@imeepos/request';
import { join } from "path";
import { config } from 'dotenv';
import { connect } from 'mongoose'
import express from 'express'
import cors from 'cors';
import { ModuleDecorator, RouterModel } from '@imeepos/core';
import { render } from '@imeepos/render'
import '@imeepos/addon';

export async function bootstrap(root: string) {
    config({ path: join(root, '.env') });
    connect(process.env.MONGO_URL || '')
    await RouterModel.updateMany({}, { status: -1 })
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
    const logger = new SystemLogger()
    ModuleDecorator.router.forEach((handler, key) => {
        const reg = /(.*?)\:\/(.*)\/(v.*?)\/(.*)/
        const matchRes = key.match(reg)
        if (matchRes && matchRes.length === 5) {
            const [str, method, module, version, path] = matchRes;
            const call = Reflect.get(app, method.toLowerCase())
            const key = `/${module}/${version}/${path}`
            call.bind(app)(key, handler)
        }
    })
    ModuleDecorator.html.forEach((html) => {
        render(html.template, {
            meta: html.meta,
            name: html.name,
            root: html.root
        }).catch(e => logger.error(`build html error ${html.name} ${html.template}`))
    })
    app.use(errorMiddleware);
    const port = Number(process.env.PORT || 8080)
    const host = process.env.HOST || '0.0.0.0'
    app.listen(port, host, () => {
        logger.info(`app start at http://${host}:${port}`)
    })
}

bootstrap(join(__dirname, '..'))