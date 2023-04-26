import { NextFunction, Request, Response } from "express";
import { pm2Service } from './utils'
import { useFail, useSuccess } from "@imeepos/core";
export async function list(req: Request, res: Response, next: NextFunction){
    const fail = useFail(res)
    const success = useSuccess(res)
    try {
        await pm2Service.connect()
        const list = await pm2Service.list()
        pm2Service.disconnect()
        return success(list)
    } catch (e) {
        return fail(e)
    }
}