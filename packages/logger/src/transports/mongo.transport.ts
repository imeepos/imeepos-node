import Transport from 'winston-transport'
import { Schema, model, connection } from 'mongoose'
export const LoggerSchema = new Schema({
    level: String,
    message: String,
    timestamp: Date,
    stack: String,
    pid: String,
    label: String,
    reqid: String,
    siteid: String,
    nodeid: String
})
export const LoggerModel = model('logger', LoggerSchema)
export interface MongoTransportOptions { 
    level: string;
}
export class MongoTransport extends Transport {
    constructor(options: MongoTransportOptions) {
        super(options)
    }

    async log(info: any, callback: any) {
        setImmediate(() => {
            this.emit('logged', info);
        });
        await connection.asPromise()
        const { message, pid, stack, label, level, timestamp, reqid, siteid, nodeid } = info;
        const item = new LoggerModel({ message, pid, stack, label, level, timestamp, reqid, siteid, nodeid });
        await item.save()
        callback();
    }
}