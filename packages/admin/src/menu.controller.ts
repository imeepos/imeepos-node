import { Request } from 'express'
import { v1 } from './decorators'
import { getMenuItems, saveMenuItem, delMenuItem } from './models/menu.model'

export class MenuItemController {
    @v1.get({ path: 'getMenuItems' })
    _getMenuItems(): Promise<any> {
        return getMenuItems()
    }

    @v1.post({ path: 'saveMenuItem' })
    async _saveMenuItem(req: Request) {
        const body = req.body;
        const { key, label, title, icon, disabled } = body;
        if (!key) {
            throw new Error(`body.key不能为空`)
        }
        if (!label) {
            throw new Error(`body.label不能为空`)
        }
        await saveMenuItem({ key, label, title, icon, disabled: !!disabled })
        return { key }
    }

    @v1.post({ path: 'delMenuItem' })
    async _delMenuItem(req: Request): Promise<any> {
        const body = req.body;
        const { key } = body;
        if (!key) {
            throw new Error(`body.key不能为空`)
        }
        await delMenuItem(key)
        return { key }
    }
}