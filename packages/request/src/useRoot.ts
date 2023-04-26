import { Request } from "express";

export function useRoot(req: Request){
    return Reflect.get(req, 'root')
}