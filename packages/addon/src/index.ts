import { NextFunction, Request, Response } from "express";
import { v1, v2 } from "./decortors";
import { success } from '@imeepos/core'
import { join } from "path";
export class Addon {
    @v1.get({ path: 'list', title: '应用列表', description: '获取用户列表的接口' })
    list(req: Request, res: Response, next: NextFunction) {
        return success(res, [])
    }

    @v2.get({ path: 'list' })
    list2(req: Request, res: Response, next: NextFunction) {
        return success(res, [])
    }

    @v1.post({ path: 'install', title: '安装应用', description: '安装应用接口' })
    install(req: Request, res: Response, next: NextFunction) {
        return success(res, {})
    }

    @v1.post({ path: 'uninstall', title: '卸载应用', description: '卸载应用的接口' })
    uninstall(req: Request, res: Response, next: NextFunction) {
        return success(res, {})
    }

    @v1.post({ path: 'upgrade', title: '更新应用', description: '更新应用的接口' })
    upgrade(req: Request, res: Response, next: NextFunction) {
        return success(res, {})
    }

    @v1.html(join(__dirname, '../static'), 'index.html', {})
    index!: string;
}
