import { Logger } from "./logger";
import { Request } from 'express'
export function useLoggerFactory(req: Request): (label: string) => Logger {
    return Reflect.get(req, 'logger')
}
export function useLogger(req: Request, label: string){
    return useLoggerFactory(req)(label)
}