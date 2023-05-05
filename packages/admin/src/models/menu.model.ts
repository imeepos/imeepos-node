import { Schema, model } from 'mongoose'
const MenuItemSchema = new Schema({
    disabled: Boolean,
    icon: String,
    key: String,
    label: String,
    title: String
})
const MenuItemModel = model('menu_item', MenuItemSchema)
export function getMenuItems() {
    return MenuItemModel.find({})
}
export async function saveMenuItem({ key, label, title, icon, disabled }: { key: string, label: string, title: string, icon: string, disabled: boolean }) {
    const menu = await MenuItemModel.findOne({ key })
    if (menu) {
        await MenuItemModel.updateOne({ key }, { label, title, icon, disabled })
    } else {
        const data = new MenuItemModel({ key, label, title, icon, disabled })
        await data.save();
    }
}
export async function delMenuItem(key: string) {
    await MenuItemModel.deleteOne({ key })
}
