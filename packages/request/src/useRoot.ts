import { Request } from "express";

export function useRoot(req: Request){
    return Reflect.get(req, 'root')
}

export function useReqid(req: Request){
    return Reflect.get(req, 'reqid')
}