import { Schema, model } from 'mongoose'

export const MimeTypeSchema = new Schema({
    ext: String,
    type: String
})

const MimeTypeModel = model('mimetype', MimeTypeSchema)

export function initMimeType() {

}

export async function setMimeType(ext: string, type: string) {
    const item = await MimeTypeModel.findOne({ ext })
    if (item) {
        await MimeTypeModel.updateOne({ ext }, { type })
    } else {
        await new MimeTypeModel({ ext, type }).save()
    }
}