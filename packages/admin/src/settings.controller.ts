import { v1 } from "./decorators";
import { Request } from "express";

export class SettingsController {
    @v1.get({ path: 'getSettingTabs' })
    async _getSettingTabs(req: Request) {
        return [
            { key: 'upload', label: '上传配置' }, 
            { key: 'copyright', label: '版权配置' }
        ];
    }
}