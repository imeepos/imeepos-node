import { Schema, model } from 'mongoose'

const AttachmentSchema = new Schema({
    key: String,
    bucket: String,
    url: String
})

const AttachmentModel = model('attachment', AttachmentSchema)

export async function saveAttachment(bucket: string, key: string, url: string) {
    const item = await AttachmentModel.findOne({ bucket, key })
    if (!item) {
        await new AttachmentModel({ bucket, key, url }).save()
    }else{
        await AttachmentModel.updateOne({bucket, key}, {url})
    }
}
export async function delAttachment(bucket: string, key: string) {
    await AttachmentModel.deleteOne({ bucket, key })
}
export async function saveAttachments(list: {bucket: string, key: string, url: string}[]){
    await Promise.all(list.map(item=>{
        return saveAttachment(item.bucket, item.key, item.url)
    }))
}