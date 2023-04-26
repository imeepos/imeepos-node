export { MiddlewareService, MiddlewareModel } from './public_api'
import { Express } from 'express'
import { MiddlewareService } from './public_api'
export default async (app: Express) => {
    const middlewareService = new MiddlewareService()
    const list = await middlewareService.findEnable()
    await Promise.all(list.map(async item => {
        if(item.name){
            const main = require.resolve(item.name)
            app.use(await require(main).default())
        }
    }))
}