import { Schema, model } from 'mongoose'

const IconSchema = new Schema({
    src: String,
    tag: String
})
const IconModel = model('icon', IconSchema)
