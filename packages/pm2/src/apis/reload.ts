import { NextFunction, Request, Response } from "express";
import { pm2Service } from './utils'
import { useFail, useSuccess } from "@imeepos/core";
export async function reload(req: Request, res: Response, next: NextFunction){
    const fail = useFail(res)
    const success = useSuccess(res)
    try {
        const body = req.body;
        if (!body) {
            return fail(`body is required`)
        }
        const process = body.process;
        if(!process){
            return fail(`body.process is required`)
        }
        await pm2Service.connect()
        const proc = await pm2Service.reload(process)
        pm2Service.disconnect()
        return success(proc)
    } catch (e) {
        return fail(e)
    }
}