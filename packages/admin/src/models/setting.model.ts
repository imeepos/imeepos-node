import { Schema, model } from 'mongoose'
const SettingSchema = new Schema({
    key: { type: String, unique: true },
    value: Object
})
export const SettingModel = model('setting', SettingSchema)
export class NotFoundSettingByKeyError extends Error { }
export class Setting {
    async get<T>(key: string): Promise<T | null> {
        const item = await SettingModel.findOne({ key })
        if (item) return item.value;
        return null;
    }
    async set<T>(key: string, val: T): Promise<void> {
        const item = await SettingModel.findOne({ key })
        if (item) {
            await SettingModel.updateOne({ key }, { value: val })
        } else {
            await new SettingModel({ key, value: val }).save()
        }
    }
}
const setting: Setting = new Setting()
export class SettingWithKey {
    constructor(private key: string) { }
    get<T>(): Promise<T | null> {
        return setting.get(this.key)
    }
    set<T>(val: T): Promise<void> {
        return setting.set(this.key, val)
    }
}
export function useSetting(key: string) {
    return new SettingWithKey(key)
}
