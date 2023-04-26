import { Schema, model } from 'mongoose'
import { Request } from 'express'
import { URL } from 'url'
import { v4 } from 'uuid';
function getRealIP(req: Request) {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (typeof xForwardedFor === 'string') {
        const arr = xForwardedFor.split(',');
        return arr[0];
    }
    return req.socket.remoteAddress;
}
const RequestSchema = new Schema({
    reqid: String,
    hostname: String,
    method: String,
    path: String,
    query: String,
    params: Object,
    body: Object,
    status: String,
    reason: String,
    ua: String,
    create_at: Date,
    update_at: Date,
    headers: Object,
    ip: String,
    response_time: Number,
})
export const RequestLogModel = model('request_log', RequestSchema)
export class RequestService {
    async save(req: Request) {
        const url = new URL(req.url, 'http://localhost')
        const headers = req.headers;
        const reqid = v4()
        const item = new RequestLogModel({
            reqid,
            hostname: url.hostname,
            method: req.method,
            path: url.pathname,
            query: url.search,
            body: req.body,
            params: req.params,
            status: 'waiting',
            create_at: new Date(),
            update_at: new Date(),
            ua: headers['user-agent'] || '',
            reason: '',
            headers,
            ip: getRealIP(req),
            response_time: 0
        })
        await item.save();
        Reflect.set(req, 'reqid', reqid);
        return reqid;
    }

    async update(req: Request, status: number, reason: string = ``) {
        const reqid = Reflect.get(req, 'reqid');
        const item = await RequestLogModel.findOne({ reqid }, { create_at: 1, reqid: 1 })
        if (item) {
            const update_at = new Date()
            const create_at = item.create_at!
            const response_time = update_at.getTime() - create_at.getTime();
            await RequestLogModel.updateOne({ reqid }, { status, reason, update_at, response_time })
        }
    }
}