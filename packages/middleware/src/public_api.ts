import { Schema, model } from 'mongoose'

export const MiddlewareSchema = new Schema({
    status: Number,
    icon: String,
    name: String,
    title: String,
    desc: String,
    version: String,
    author: String,
    options: Object,
    create_at: Date,
    update_at: Date
})

export const MiddlewareModel = model('middleware', MiddlewareSchema)

export class MiddlewareService {

    async enable(name: string) {
        await MiddlewareModel.updateOne({ name }, { status: 1 })
    }

    async disable(name: string) {
        await MiddlewareModel.updateOne({ name }, { status: 0 })
    }

    async save(res: { status: number, name: string, title: string, desc: string, options: object }) {
        const item = await this.findOneByName(res.name)
        if (item) {
            await MiddlewareModel.updateOne({ name: res.name }, { title: res.title, status: res.status, desc: res.desc, options: res.options })
        } else {
            await new MiddlewareModel(res).save()
        }
    }

    findOneByName(name: string) {
        return MiddlewareModel.findOne({ name })
    }

    findEnable() {
        return MiddlewareModel.find({ status: 1 })
    }
}