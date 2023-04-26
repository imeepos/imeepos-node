import { NextFunction, Request, Response } from "express";
import { pm2Service } from './utils'
import { useFail, useSuccess } from "@imeepos/core";
export async function startup(req: Request, res: Response, next: NextFunction){
    const fail = useFail(res)
    const success = useSuccess(res)
    try {
        await pm2Service.connect()
        const proc = await pm2Service.startup('darwin')
        pm2Service.disconnect()
        return success(proc)
    } catch (e) {
        return fail(e)
    }
}